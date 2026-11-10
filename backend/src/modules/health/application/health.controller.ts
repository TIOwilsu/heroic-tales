import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./services/health.service";

@Controller("health")
export class HealthController {
  constructor(private readonly _healthService: HealthService) {}

  @Get()
  check() {
    return this._healthService.check();
  }
}
