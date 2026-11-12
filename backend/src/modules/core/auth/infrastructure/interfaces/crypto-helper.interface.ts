import { AuthTokenPayload } from "@/modules/core/auth/infrastructure/dtos/auth-token-payload";

export interface ICryptoHelper {
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, encodedHash: string): Promise<boolean>;
  createAccessToken(userId: string, email: string, expiresAt: Date): string;
  createRefreshToken(userId: string, email: string, expiresAt: Date): string;
  verifyAccessToken(token: string): AuthTokenPayload | undefined;
  verifyRefreshToken(token: string): AuthTokenPayload | undefined;
  digestToken(token: string): string;
}
