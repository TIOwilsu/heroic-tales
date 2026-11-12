export interface IAuthService {
  readonly accessTokenDurationMs?: number;
  readonly refreshTokenDurationMs?: number;
  readonly createUserId?: () => string;
}
