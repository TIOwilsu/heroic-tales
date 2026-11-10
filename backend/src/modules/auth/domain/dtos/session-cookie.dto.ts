export interface SessionCookieDTO {
  readonly secure: boolean;
  readonly maxAgeSeconds: number;
  readonly sameSite?: "Strict" | "Lax" | "None";
}