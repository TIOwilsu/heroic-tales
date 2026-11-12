import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { ICryptoHelper } from "@/modules/core/auth/infrastructure/interfaces/crypto-helper.interface";
import { CRYPTO_HELPER } from "@/modules/core/auth/auth.tokens";
import type { IUserRepository } from "@/modules/core/user/infrastructure/interfaces/user-repository.interface";
import { USER_REPOSITORY } from "@/modules/core/user/user.tokens";
import { AuthenticatedRequestDTO } from "@/modules/core/auth/infrastructure/dtos/authenticated-request.dto";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    @Inject(CRYPTO_HELPER)
    private readonly _cryptoHelper: ICryptoHelper,
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserRepository,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequestDTO>();
    const token = this._extractBearerToken(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException("A valid access token is required.");
    }

    const payload = this._cryptoHelper.verifyAccessToken(token);
    if (!payload) {
      throw new UnauthorizedException("A valid access token is required.");
    }

    const user = await this._userRepository.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedException("A valid access token is required.");
    }

    request.user = {
      id: user._id,
      email: user.email,
    };

    return true;
  }

  private _extractBearerToken(
    authorizationHeader: string | undefined,
  ): string | undefined {
    if (!authorizationHeader) {
      return undefined;
    }

    const [scheme, token, ...extraParts] = authorizationHeader.trim().split(/\s+/);
    if (scheme?.toLowerCase() !== "bearer" || !token || extraParts.length > 0) {
      return undefined;
    }

    return token;
  }
}
