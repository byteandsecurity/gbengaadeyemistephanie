import "server-only";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";

const ISSUER = "Portfolio Admin";
const PERIOD = 30;

export function newTotpSecret(): string {
  return new OTPAuth.Secret({ size: 20 }).base32;
}

function build(secretBase32: string, label: string) {
  return new OTPAuth.TOTP({
    issuer: ISSUER,
    label,
    algorithm: "SHA1", // the algorithm every authenticator app supports
    digits: 6,
    period: PERIOD,
    secret: OTPAuth.Secret.fromBase32(secretBase32),
  });
}

/**
 * Returns the time step of the accepted code, or null if the code is wrong.
 * The caller rejects a step that is not newer than the last one used (replay protection).
 */
export function checkTotp(secretBase32: string, code: string, label = "admin"): number | null {
  const cleaned = code.replace(/\s+/g, "");
  if (!/^\d{6}$/.test(cleaned)) return null;
  const delta = build(secretBase32, label).validate({ token: cleaned, window: 1 });
  if (delta === null) return null;
  return Math.floor(Date.now() / 1000 / PERIOD) + delta;
}

export async function qrDataUrl(secretBase32: string, label: string): Promise<string> {
  return QRCode.toDataURL(build(secretBase32, label).toString(), { margin: 1, width: 220 });
}
