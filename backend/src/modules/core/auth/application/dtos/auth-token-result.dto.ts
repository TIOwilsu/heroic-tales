export interface AuthTokenResultDTO {
  readonly user: {
    readonly id: string;
    readonly email: string;
  };
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessTokenExpiresAt: Date;
  readonly refreshTokenExpiresAt: Date;
}
