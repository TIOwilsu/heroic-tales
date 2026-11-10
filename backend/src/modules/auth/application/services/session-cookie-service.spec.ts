import { SessionCookieService } from "./session-cookie.service";

describe("session cookies", () => {
  const service = new SessionCookieService();

  it("uses an HTTP-only secure cookie for deployed sessions", () => {
    const cookie = service.buildSessionCookie("opaque token", {
      secure: true,
      maxAgeSeconds: 3600,
    });

    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    expect(cookie).toContain("SameSite=Lax");
    expect(service.readSessionToken(cookie)).toBe("opaque token");
  });

  it("can expire a session without exposing its prior token", () => {
    const cookie = service.buildExpiredSessionCookie(true);

    expect(cookie).toContain("Max-Age=0");
    expect(cookie).not.toContain("opaque");
    expect(service.readSessionToken(cookie)).toBeUndefined();
  });
});
