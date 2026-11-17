# Stephanie's portfolio

A Next.js site with three public pages (landing, Software engineering, Cybersecurity and GRC) and a private admin at `/admin` for editing everything on them. Content lives in Postgres; the pages are prerendered and refresh the moment you save in the admin.

- Public pages: `app/(site)/`
- Admin: `app/admin/`
- Database tables: `db/schema.ts` (explained in `docs/DATABASE.md`)
- Starter content (also used as the seed and as a fallback): `content/`

## What to download

| Software | Why | Notes |
| --- | --- | --- |
| Node.js 22 LTS | Runs the project (20.9 or newer works) | https://nodejs.org, accept the defaults |
| WebStorm | Your editor | You already have it |
| Git | Needed to push to GitHub so Vercel can deploy | https://git-scm.com |
| An authenticator app | The second sign-in step | Microsoft Authenticator or Google Authenticator on your phone |

You do **not** need to install a database. The database is a free hosted Postgres from Neon, created in the browser. WebStorm's built-in **Database** tool window can connect to it if you ever want to look at the tables.

Accounts (all free): Neon (or create it from inside Vercel, see below), Vercel, GitHub.

## First-time setup on your computer

1. Unzip the project and open the folder in WebStorm. Open the **Terminal** tab at the bottom (use this, not a Run configuration, for the password prompts later).
2. Install packages: `npm install`
3. Create the database. Go to https://neon.com, sign up, create a project (pick a region near you, for example Europe or US East). In the project, create a branch called `dev` for local work, so you never edit live content by accident while testing. Copy that branch's **pooled** connection string.
4. Copy `.env.example` to `.env.local` and fill it in:
   - `DATABASE_URL` is the connection string from step 3.
   - `APP_ENCRYPTION_KEY`: run `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` and paste the result.
5. Create the tables: `npm run db:migrate`
6. Load your starting content: `npm run db:seed` (safe to run again; it never overwrites rows you have edited)
7. Create your admin account: `npm run admin:create`. It asks for your email and a password of at least 14 characters. There is no sign-up page; this command is the only way an account is created.
8. Start the site: `npm run dev`, then open http://localhost:3000 for the site and http://localhost:3000/admin for the admin.
9. On first sign-in the admin shows a QR code. Scan it with your authenticator app and enter the 6-digit code. From then on every sign-in needs password plus code.

## Putting it on Vercel

1. Create a GitHub repository and push the project (`.env.local` is ignored by Git, so your secrets stay local).
2. In Vercel choose **Add New, Project**, import the repository and deploy once.
3. Give the project a database. Two ways, pick one:
   - From Vercel: **Storage**, add **Neon** from the Marketplace, create a database on the free plan and connect it to the project. Vercel then sets `DATABASE_URL` (pooled) for you.
   - From Neon directly: copy the connection string of your production branch and add it in Vercel under **Settings, Environment Variables** as `DATABASE_URL`.
4. Add `APP_ENCRYPTION_KEY` in the same place. Generate a fresh value for production with the command in step 4 above. Do not reuse the one from `.env.local` unless both environments use the same database.
5. Create the production tables and account from your computer. In the WebStorm terminal, set the production connection string for that one session and run the three commands:
   - PowerShell: `$env:DATABASE_URL="<production string>"`
   - macOS or Linux: `export DATABASE_URL="<production string>"`
   - then `npm run db:migrate`, `npm run db:seed`, `npm run admin:create`
6. Redeploy in Vercel (Deployments, the three dots, Redeploy) so the build picks up the content. Open `https://your-site/admin`, sign in and set up the authenticator for the production account.

## Using the admin

Everything is under `/admin`. The Dashboard lists each section with how many items it holds. Open a section to see its items, click one to edit, or use **Add** to create a new one. Each item has an **Order** number (lowest shows first) and a **Published** switch: untick it to keep an item as a draft that visitors cannot see. Saving updates the live site immediately. **Activity** shows every sign-in, failed attempt and content change.

| Admin section | Where it appears on the site |
| --- | --- |
| Profile | Landing page: headline, intro, About, the two panels, footer contact links |
| Experience | Software page or Cybersecurity page (the "Shows on" field decides) |
| Software projects | Software page |
| Research summaries | Software and/or Cybersecurity page |
| Ubuntu Bridge stages | Cybersecurity page |
| Lab projects | Cybersecurity page, grouped by the Group field |
| Certifications and memberships | Landing page and/or Cybersecurity page |
| Honours | Landing page |

## How sign-in is protected

- One admin account, no public sign-up, created only from the command line.
- Passwords are stored as bcrypt hashes (cost 12). Sign-in needs the password and then a 6-digit authenticator code.
- The authenticator secret is encrypted in the database with AES-256-GCM. A code can be used only once (replays are refused).
- The browser holds a random token in an HttpOnly, SameSite=Strict, Secure cookie (the `__Host-` prefix in production). Only a hash of the token is stored, sessions last 8 hours, and signing out deletes the session on the server.
- Five failed attempts within 15 minutes lock that IP address and that email for 15 minutes. The sign-in error never says whether the email exists.
- Every admin page and every save or delete re-checks the session on the server; hiding a button is never the protection.
- Admin pages are marked `noindex` and `no-store`. The site sends standard security headers.
- Every sign-in, failure and content change is written to the Activity log (field names only, never the content).

Limits worth knowing: there is no "forgot password" email (use `npm run admin:create` with your email to set a new password), and someone who deliberately fails five times from your address can lock you out for 15 minutes.

## If you lose your phone

Run `npm run admin:reset-mfa` (with the right `DATABASE_URL`). It clears the authenticator and ends all sessions. Sign in with your password and set up a new authenticator.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build`, `npm start` | Production build and server |
| `npm run db:migrate` | Create or update tables from `db/migrations` |
| `npm run db:seed` | Load starting content from `content/` (never overwrites edits) |
| `npm run db:generate` | After changing `db/schema.ts`, create a new migration file |
| `npm run admin:create` | Create the admin, or reset its password |
| `npm run admin:reset-mfa` | Clear the authenticator and all sessions |
| `npm run typecheck` | Check the TypeScript |

If WebStorm underlines `PageProps` or `LayoutProps` in red, run `npm run dev` or `npx next typegen` once; Next.js generates those route types on first run.

## Without a database

If `DATABASE_URL` is not set, the site shows the content in `content/` instead, so you can work on the design before a database exists. The admin needs the database.

## Changing what the admin can edit

To add a field (say, a `link` on projects): add the column in `db/schema.ts`, run `npm run db:generate` then `npm run db:migrate`, add the field to that section in `lib/admin/collections.ts` (this adds it to the admin form and validation), add it to the type in `content/types.ts` and the matching function in `lib/content.ts`, then show it in the page. A new whole section follows the same pattern with a new table and a new entry in the `collections` list.
