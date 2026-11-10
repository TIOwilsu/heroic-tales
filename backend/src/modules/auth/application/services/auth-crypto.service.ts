import { Injectable } from "@nestjs/common";
import {
  createHash,
  randomBytes,
  scrypt as nodeScrypt,
  timingSafeEqual,
} from "node:crypto";

const SCRYPT_COST = 16_384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;
const SALT_BYTES = 16;
const KEY_BYTES = 64;


@Injectable()
export class AuthCryptoService {
  private _deriveKey(
    password: string,
    salt: Buffer,
    keyLength: number,
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      nodeScrypt(
        password,
        salt,
        keyLength,
        {
          N: SCRYPT_COST,
          r: SCRYPT_BLOCK_SIZE,
          p: SCRYPT_PARALLELIZATION,
        },
        (error, derivedKey) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(derivedKey);
        },
      );
    });
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(SALT_BYTES);
    const derivedKey = await this._deriveKey(password, salt, KEY_BYTES);

    return [
      "scrypt",
      SCRYPT_COST,
      SCRYPT_BLOCK_SIZE,
      SCRYPT_PARALLELIZATION,
      salt.toString("base64url"),
      derivedKey.toString("base64url"),
    ].join("$");
  }

  public async verifyPassword(
    password: string,
    encodedHash: string,
  ): Promise<boolean> {
    const [algorithm, cost, blockSize, parallelization, encodedSalt, encodedKey] =
      encodedHash.split("$");

    if (
      algorithm !== "scrypt" ||
      !encodedSalt ||
      !encodedKey ||
      Number(cost) !== SCRYPT_COST ||
      Number(blockSize) !== SCRYPT_BLOCK_SIZE ||
      Number(parallelization) !== SCRYPT_PARALLELIZATION
    ) {
      return false;
    }

    const salt = Buffer.from(encodedSalt, "base64url");
    const expectedKey = Buffer.from(encodedKey, "base64url");
    const actualKey = await this._deriveKey(password, salt, expectedKey.length);

    return (
      actualKey.length === expectedKey.length &&
      timingSafeEqual(actualKey, expectedKey)
    );
  }

  public createAccessToken(): string {
    return randomBytes(32).toString("base64url");
  }

  public createRefreshToken(): string {
    return randomBytes(48).toString("base64url");
  }

  public digestToken(token: string): string {
    return createHash("sha256").update(token).digest("base64url");
  }
}
