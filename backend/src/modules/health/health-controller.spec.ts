import { HealthController } from "@/modules/health/health.controller";
import { HealthService } from "@/modules/health/application/services/health.service";

describe("HealthController", () => {
  it("returns a stable health response without environment values", () => {
    const controller = new HealthController(new HealthService());

    expect(controller.check()).toEqual({ status: "ok" });
  });
});
