import { Module } from "@nestjs/common";
import { HealthModule } from "@/modules/health/health.module";
import { CoreModule } from "@/modules/core/core.module";

@Module({
  imports: [HealthModule, CoreModule],
})
export class AppModule {}
