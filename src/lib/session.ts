import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/lib/constants";

const TTL_MS = 7 * 24 * 60 * 60 * 1000;

function secret(): string {
  return process.env.SESSION_SECRET ?? "dev-secret-change-me";
}

type SessionPayload = { userId: string; exp: number };

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createAuthToken(userId: string): string {
  const body: SessionPayload = { userId, exp: Date.now() + TTL_MS };
  const encoded = Buffer.from(JSON.stringify(body)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifyAuthToken(token: string): SessionPayload | null {
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;
  const expected = sign(encoded);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString()) as SessionPayload;
    if (!payload.userId || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAuthUserId(): Promise<string | null> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifyAuthToken(token)?.userId ?? null;
}
