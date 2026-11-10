import { Injectable } from "@nestjs/common";
import type { SessionCookieDTO } from "../../domain/dtos/session-cookie.dto";
export const SESSION_COOKIE_NAME = "heroic_tales_session";

@Injectable()
export class SessionCookieService {
  public readSessionToken(cookieHeader: string | undefined): string | undefined {
    if (!cookieHeader) {
      return undefined;
    }

    for (const item of cookieHeader.split(";")) {
      const separator = item.indexOf("=");
      if (separator < 0) {
        continue;
      }

      const name = item.slice(0, separator).trim();
      if (name === SESSION_COOKIE_NAME) {
        try {
          return decodeURIComponent(item.slice(separator + 1).trim()) || undefined;
        } catch {
          return undefined;
        }
      }
    }

    return undefined;
  }

  public buildSessionCookie(
    sessionToken: string,
    options: SessionCookieDTO,
  ): string {
    const sameSite = options.sameSite ?? "Lax";
    return [
      `${SESSION_COOKIE_NAME}=${encodeURIComponent(sessionToken)}`,
      "Path=/",
      "HttpOnly",
      `Max-Age=${options.maxAgeSeconds}`,
      `SameSite=${sameSite}`,
      ...(options.secure ? ["Secure"] : []),
    ].join("; ");
  }

  public buildExpiredSessionCookie(secure: boolean): string {
    return this.buildSessionCookie("", {
      secure,
      maxAgeSeconds: 0,
    });
  }
}
