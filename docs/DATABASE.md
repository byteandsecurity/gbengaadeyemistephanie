# Database structure

Postgres, 12 tables. The SQL that creates them is `db/migrations/0000_init.sql`; the typed definition is `db/schema.ts`. Text lists (bullets, tags and so on) are stored as native Postgres `text[]` arrays, so one row holds a whole entry and there are no join tables.

## Shared columns on every content table

Every table below except `profile` also has these four columns.

| Column | Type | Meaning |
| --- | --- | --- |
| `position` | integer | Sort order on the public page, lowest first |
| `published` | boolean | `false` is a draft: kept in the database, hidden from visitors |
| `created_at` | timestamptz | When the row was made |
| `updated_at` | timestamptz | When it last changed |

Each content table's primary key `id` is a short readable text slug such as `sidmach` or `ubi-3`, created from the title when you add an item in the admin.

## Public content tables

### `profile` (always exactly one row, id = 1)

| Column | Type | Used for |
| --- | --- | --- |
| `id` | integer, PK | Always 1 |
| `name`, `short_name` | text | Full name for the footer, short name for the header and browser tab |
| `headline`, `intro` | text | The big headline and the sentence under it on the landing page |
| `about` | text[] | About paragraphs, one array item per paragraph |
| `email`, `linkedin`, `github` | text | Footer contact links |
| `focus_areas` | text[] | The "Where I work" list |
| `software_title`, `software_lead`, `software_proof`, `software_cta` | text, text, text[], text | The blue landing panel: title, sentence, proof lines, button text |
| `security_title`, `security_lead`, `security_proof`, `security_cta` | text, text, text[], text | The amber landing panel |
| `updated_at` | timestamptz | |

### `credentials`

Certifications and memberships. `name`, `issuer`, `detail` (text). `pages` text[] holds `home` and/or `security` and decides which page lists it.

### `recognition`

Honours on the landing page. `title`, `detail` (text).

### `experience`

Work history. `page` is `software` or `security` and decides which page shows it. `role`, `org`, `period` (text), `place`, `summary` (optional text), `status` (optional: `Completed`, `In progress` or `Pre-launch`), `bullets` text[].

### `projects`

Software projects. `title`, `status` (`Completed`, `In progress`, `Pre-launch`), `period` (optional text), `description` (text), `stack` text[], `highlights` text[].

### `research`

Research summaries. `title`, `context` (for example "ChamsMobile, 2023"), `summary` (text). `pages` text[] holds `software` and/or `security`.

### `stages`

Ubuntu Bridge Initiative stages. `stage` (integer, the stage number), `title`, `score` (optional text such as `90/100`), `detail` (text). Shown in stage-number order.

### `lab_projects`

Google Cybersecurity Certificate labs. `number` (integer, the "Project N" label), `title`, `summary` (text), `tags` text[], `group_name` (one of: Governance, risk and compliance; Network and incident analysis; Detection and response; Tooling and professional practice). The page groups by `group_name`.

## Admin and security tables

The public site never reads these.

### `admin_users`

| Column | Type | Meaning |
| --- | --- | --- |
| `id` | uuid, PK | |
| `email` | text, unique | Sign-in email, stored lower-case |
| `password_hash` | text | bcrypt hash, never the password |
| `totp_secret_enc` | text, nullable | Authenticator secret, AES-256-GCM encrypted with `APP_ENCRYPTION_KEY` |
| `totp_enabled` | boolean | True once you have confirmed a code |
| `totp_last_step` | bigint, nullable | Time step of the last accepted code, so a code works only once |
| `created_at`, `last_login_at` | timestamptz | |

### `admin_sessions`

| Column | Type | Meaning |
| --- | --- | --- |
| `id` | uuid, PK | |
| `user_id` | uuid, FK to `admin_users`, cascade delete | |
| `token_hash` | text, unique | SHA-256 of the cookie token; the token itself is never stored |
| `mfa_verified` | boolean | False between password and code; admin pages need true |
| `created_at`, `expires_at` | timestamptz | 10 minutes before the code step, 8 hours after |
| `ip`, `user_agent` | text | For your own reference |

### `auth_throttle`

Failed sign-in counters. `key` (text, PK, like `ip:1.2.3.4` or `email:you@example.com`), `failures` (integer), `window_start` and `locked_until` (timestamptz).

### `audit_log`

Append-only history. `id` (bigserial, PK), `at` (timestamptz), `actor` (email or `anonymous`), `action` (for example `login`, `login_failed`, `mfa_enabled`, `create`, `update`, `delete`), `target` (like `projects/movie`), `detail` (for example `changed: summary, bullets`), `ip`.

## Relationships

There is one real foreign key: `admin_sessions.user_id` to `admin_users.id`. Content tables are independent of each other; which page an entry appears on is controlled by its `page` or `pages` column, not by a relation.
