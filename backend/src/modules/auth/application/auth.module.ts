import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthCryptoService } from "./services/auth-crypto.service";
import { OwnershipPolicyService } from "./services/ownership-policy.service";
import { AccountStoreService } from "../infrastructure/persistence/account-store.service";
import { SessionStoreService } from "../infrastructure/persistence/session-store.service";

@Module({
  controllers: [],
  providers: [
    OwnershipPolicyService,
    { provide: 'AUTH_ACCOUNT_STORE', useClass: AccountStoreService },
    { provide: 'AUTH_SESSION_STORE', useClass: SessionStoreService },
    { provide: 'AUTH_CRYPTO_SERVICE', useClass: AuthCryptoService },
    { provide: 'AUTH_OPTIONS', useValue: {} },
    { provide: 'AUTH_SERVICE', useClass: AuthService },
  ],
})
export class AuthModule {}
