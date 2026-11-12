import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppError } from "@/shared/application/errors/app-error";
import { AccessTokenInputDTO } from "@/modules/core/auth/application/dtos/access-token-input.dto";
import { AuthTokenResultDTO } from "@/modules/core/auth/application/dtos/auth-token-result.dto";
import { IUserRepository } from "@/modules/core/user/infrastructure/interfaces/user-repository.interface";
import { USER_REPOSITORY } from "@/modules/core/user/user.tokens";
import { ICryptoHelper } from "@/modules/core/auth/infrastructure/interfaces/crypto-helper.interface";
import { CRYPTO_HELPER } from "@/modules/core/auth/auth.tokens";

const ACCESS_TOKEN_DURATION_MS = 1000 * 60 * 15;
const REFRESH_TOKEN_DURATION_MS = 1000 * 60 * 60 * 24 * 7;


@CommandHandler(AccessTokenInputDTO)
export class AccessTokenUseCase
  implements ICommandHandler<AccessTokenInputDTO, AuthTokenResultDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserRepository,
    @Inject(CRYPTO_HELPER)
    private readonly _cryptoHelper: ICryptoHelper,
  ) {}

  public async execute(
    credentials: AccessTokenInputDTO,
  ): Promise<AuthTokenResultDTO> {
    const email = credentials.email.trim().toLowerCase();
    const user = (await this._userRepository.findByEmail(email));

    const passwordIsValid = user
      ? await this._cryptoHelper.verifyPassword(credentials.password, user.passwordHash)
      : false;

    if (!user || !passwordIsValid) {
      throw new AppError(401, "AUTH_INVALID_CREDENTIALS", "Invalid credentials.");
    }

    const accessTokenExpiresAt = new Date(
      Date.now() + ACCESS_TOKEN_DURATION_MS,
    );
    const refreshTokenExpiresAt = new Date(
      Date.now() + REFRESH_TOKEN_DURATION_MS,
    );
    const accessToken = this._cryptoHelper.createAccessToken(
      user._id,
      user.email,
      accessTokenExpiresAt,
    );
    const refreshToken = this._cryptoHelper.createRefreshToken(
      user._id,
      user.email,
      refreshTokenExpiresAt,
    );
 
    return {
      user: { id: user._id, email: user.email },
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    };
  }
}
