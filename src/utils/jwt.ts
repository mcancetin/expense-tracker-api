import { JWTPayload, jwtVerify, SignJWT } from "jose";
import env from "@/env";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export async function createJWT(
  payload: JWTPayload,
  expirationTime: number | string | Date,
): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(secret);

  return jwt;
}
export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("JWT is valid:", payload);
    return payload;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}
