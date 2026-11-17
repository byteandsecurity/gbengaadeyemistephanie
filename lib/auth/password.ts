import "server-only";
import bcrypt from "bcryptjs";

const COST = 12;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, COST);
}

// A real hash of a random string. Comparing against it when the email is unknown
// keeps the response time the same, so the form does not reveal which emails exist.
const decoy = bcrypt.hashSync("decoy-value-not-a-real-password", COST);

export async function verifyPassword(password: string, hash: string | undefined): Promise<boolean> {
  const ok = await bcrypt.compare(password, hash ?? decoy);
  return hash !== undefined && ok;
}
