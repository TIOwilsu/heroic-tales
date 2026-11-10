export interface IAuthCryptService {
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, passwordHash: string): Promise<boolean>;
  createAccessToken(): string;
  createRefreshToken(): string;
  digestToken(token: string): string;
}
