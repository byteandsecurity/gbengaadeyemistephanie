// Loads .env.local then .env, the same files Next.js reads, for the scripts.
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });
