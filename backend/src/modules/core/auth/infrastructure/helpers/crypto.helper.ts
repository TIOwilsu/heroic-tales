import { Injectable } from "@nestjs/common";
import {
  createHash,
  createHmac,
  randomBytes,
  scrypt as nodeScrypt,
  timingSafeEqual,
} from "node:crypto";
import { AuthTokenPayload, AuthTokenType } from "@/modules/core/auth/infrastructure/dtos/auth-token-payload";
import { ICryptoHelper } from "@/modules/core/auth/infrastructure/interfaces/crypto-helper.interface";

const SCRYPT_COST = 16_384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;
const SALT_BYTES = 16;
const KEY_BYTES = 64;

@Injectable()
export class CryptoHelper implements ICryptoHelper {
  private readonly _tokenSecret = process.env.AUTH_TOKEN_SECRET;

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

  public createAccessToken(
    userId: string,
    email: string,
    expiresAt: Date,
  ): string {
    return this._createToken(userId, email, "access", expiresAt);
  }

  public createRefreshToken(
    userId: string,
    email: string,
    expiresAt: Date,
  ): string {
    return this._createToken(userId, email, "refresh", expiresAt);
  }

  public verifyAccessToken(token: string): AuthTokenPayload | undefined {
    return this._verifyToken(token, "access");
  }

  public verifyRefreshToken(token: string): AuthTokenPayload | undefined {
    return this._verifyToken(token, "refresh");
  }

  public digestToken(token: string): string {
    return createHash("sha256").update(token).digest("base64url");
  }

  private _createToken(
    userId: string,
    email: string,
    type: AuthTokenType,
    expiresAt: Date,
  ): string {
    const header = this._encode({ alg: "HS256", typ: "JWT" });
    const payload = this._encode({
      sub: userId,
      email,
      type,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(expiresAt.getTime() / 1000),
    });
    const unsignedToken = `${header}.${payload}`;

    return `${unsignedToken}.${this._sign(unsignedToken)}`;
  }

  public _verifyToken(
    token: string,
    expectedType: AuthTokenType,
  ): AuthTokenPayload | undefined {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return undefined;
    }

    const [encodedHeader, encodedPayload, receivedSignature] = parts;
    let header: { alg?: string; typ?: string };
    let payload: {
      sub?: unknown;
      email?: unknown;
      type?: unknown;
      iat?: unknown;
      exp?: unknown;
    };

    try {
      header = JSON.parse(this._decode(encodedHeader)) as typeof header;
      payload = JSON.parse(this._decode(encodedPayload)) as typeof payload;
    } catch {
      return undefined;
    }

    if (header.alg !== "HS256" || header.typ !== "JWT") {
      return undefined;
    }

    const expectedSignature = this._sign(`${encodedHeader}.${encodedPayload}`);
    const receivedSignatureBuffer = Buffer.from(receivedSignature, "base64url");
    const expectedSignatureBuffer = Buffer.from(expectedSignature, "base64url");

    if (
      receivedSignatureBuffer.length !== expectedSignatureBuffer.length ||
      !timingSafeEqual(receivedSignatureBuffer, expectedSignatureBuffer)
    ) {
      return undefined;
    }

    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      payload.type !== expectedType ||
      typeof payload.iat !== "number" ||
      typeof payload.exp !== "number" ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return undefined;
    }

    return {
      userId: payload.sub,
      email: payload.email,
      type: expectedType,
      issuedAt: payload.iat * 1000,
      expiresAt: payload.exp * 1000,
    };
  }

  private _encode(value: object): string {
    return Buffer.from(JSON.stringify(value)).toString("base64url");
  }

  private _decode(value: string): string {
    return Buffer.from(value, "base64url").toString("utf8");
  }

  private _sign(value: string): string {
    if (!this._tokenSecret) {
      throw new Error("AUTH_TOKEN_SECRET must be configured.");
    }

    return createHmac("sha256", this._tokenSecret)
      .update(value)
      .digest("base64url");
  }
}
