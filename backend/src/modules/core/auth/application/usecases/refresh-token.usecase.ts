import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppError } from "@/shared/application/errors/app-error";
import { IUserRepository } from "@/modules/core/user/infrastructure/interfaces/user-repository.interface";
import { USER_REPOSITORY } from "@/modules/core/user/user.tokens";
import { ICryptoHelper } from "@/modules/core/auth/infrastructure/interfaces/crypto-helper.interface";
import { CRYPTO_HELPER } from "@/modules/core/auth/auth.tokens";
import { RefreshTokenInputDTO } from "@/modules/core/auth/application/dtos/refresh-token-input.dto";
import { AuthTokenResultDTO } from "@/modules/core/auth/application/dtos/auth-token-result.dto";

const ACCESS_TOKEN_DURATION_MS = 1000 * 60 * 15;
const REFRESH_TOKEN_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

@CommandHandler(RefreshTokenInputDTO)
export class RefreshTokenUseCase
  implements ICommandHandler<RefreshTokenInputDTO, AuthTokenResultDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserRepository,
    @Inject(CRYPTO_HELPER)
    private readonly _cryptoHelper: ICryptoHelper,
  ) {}

  public async execute(
    input: RefreshTokenInputDTO,
  ): Promise<AuthTokenResultDTO> {
    const refreshToken = input.refreshToken.trim();
    if (!refreshToken) {
      throw new AppError(
        400,
        "AUTH_INVALID_REFRESH_TOKEN",
        "A refresh token is required."
      );
    }

    const refreshTokenPayload =
      this._cryptoHelper.verifyRefreshToken(refreshToken);
    if (!refreshTokenPayload) {
      throw new AppError(
        401,
        "AUTH_INVALID_REFRESH_TOKEN",
        "The refresh token is invalid or expired."
      );
    }

    const user = await this._userRepository.findById(
      refreshTokenPayload.userId,
    );
    if (!user) {
      throw new AppError(
        401,
        "AUTH_INVALID_REFRESH_TOKEN",
        "The refresh token is invalid or expired."
      );
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
    const nextRefreshToken = this._cryptoHelper.createRefreshToken(
      user._id,
      user.email,
      refreshTokenExpiresAt,
    );

    return {
      user: { id: user._id, email: user.email },
      accessToken,
      refreshToken: nextRefreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    };
  }
}
