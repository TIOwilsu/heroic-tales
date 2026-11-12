import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { AppErrorFilter } from "@/shared/adapters/http/filters/app-error.filter";

process.loadEnvFile(".env");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3001);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AppErrorFilter());

  await app.listen(port);
}

void bootstrap();
