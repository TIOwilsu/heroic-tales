import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

describe("HealthController", () => {
  it("returns a stable health response without environment values", () => {
    const controller = new HealthController(new HealthService());

    expect(controller.check()).toEqual({ status: "ok" });
  });
});
