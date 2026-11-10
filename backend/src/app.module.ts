import { Module } from "@nestjs/common";
import { HealthModule } from "./modules/health/application/health.module";
import { AuthModule } from "./modules/auth/application/auth.module";

@Module({
  imports: [HealthModule, AuthModule],
})
export class AppModule {}
