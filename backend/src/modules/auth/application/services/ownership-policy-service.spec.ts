import { OwnershipPolicyService } from "./ownership-policy.service";

describe("ownership policy", () => {
  const service = new OwnershipPolicyService();

  it("requires authentication before accessing owned data", () => {
    expect(() => service.requireAuthenticatedUser(undefined)).toThrow(
      "Authentication is required.",
    );
  });

  it("allows the owner and rejects a different user", () => {
    const user = { id: "user-1", email: "hero@example.com" };

    expect(() => service.assertOwnership(user, "user-1")).not.toThrow();
    expect(() => service.assertOwnership(user, "user-2")).toThrow(
      "The authenticated user does not own this resource.",
    );
  });
});
