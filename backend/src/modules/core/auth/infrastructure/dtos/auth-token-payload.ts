export type AuthTokenType = "access" | "refresh";

export interface AuthTokenPayload {
  readonly userId: string;
  readonly email: string;
  readonly type: AuthTokenType;
  readonly issuedAt: number;
  readonly expiresAt: number;
}