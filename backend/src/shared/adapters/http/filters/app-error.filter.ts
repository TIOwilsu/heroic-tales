import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { AppError } from "src/shared/application/errors/app-error";

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse();

    response.status(this._statusFor(exception.code)).json({
      statusCode: this._statusFor(exception.code),
      code: exception.code,
      message: exception.message,
    });
  }

  private _statusFor(code: string): number {
    const statuses: Record<string, number> = {
      AUTH_INVALID_REFRESH_TOKEN: 401,
      AUTH_USER_NOT_FOUND: 404,
      AUTH_ACCOUNT_ALREADY_EXISTS: 409,
    };

    return statuses[code] ?? 500;
  }
}