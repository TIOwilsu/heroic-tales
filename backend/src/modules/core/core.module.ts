import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "@/modules/core/auth/auth.module";
import { UserModule } from "@/modules/core/user/user.module";

@Module({
  imports: [CqrsModule, AuthModule, UserModule],
  exports: [AuthModule, UserModule],
})
export class CoreModule {}
