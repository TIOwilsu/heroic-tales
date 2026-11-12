import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AccessTokenUseCase } from "@/modules/core/auth/application/usecases/access-token.usecase";
import { RefreshTokenUseCase } from "@/modules/core/auth/application/usecases/refresh-token.usecase";
import { UserModule } from "@/modules/core/user/user.module";
import { AuthController } from "@/modules/core/auth/auth.controller";
import { CryptoHelper } from "@/modules/core/auth/infrastructure/helpers/crypto.helper";
import { CRYPTO_HELPER } from "@/modules/core/auth/auth.tokens";
import { AuthTokenGuard } from "@/modules/core/auth/adapters/http/guards/auth-token.guard";

@Module({
  imports: [CqrsModule, UserModule],
  controllers: [AuthController],
  providers: [
    { provide: CRYPTO_HELPER, useClass: CryptoHelper },
    AuthTokenGuard,
    AccessTokenUseCase,
    RefreshTokenUseCase,
  ],
  exports: [AuthTokenGuard],
})
export class AuthModule {}
