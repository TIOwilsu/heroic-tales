export interface IAuthCryptService {
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, passwordHash: string): Promise<boolean>;
    createSessionToken(): string;
    digestSessionToken(sessionToken: string): string;
}