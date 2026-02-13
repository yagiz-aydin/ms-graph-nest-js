import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { validateCli } from '@1password/op-js';
import session from 'express-session';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception/unauthorized-exception.filter';
import crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorExceptionFilter } from './filters/internalServerError-exception/internalServerError-exception.filter';
import { ExceptionFilter } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

if (process.env.ONEPASS === 'true') {
  console.log('1Password CLI support enabled.');
  validateCli().catch(() => {
    throw new Error('1Password CLI is not valid');
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Microsoft Search NestJS API')
    .setDescription('Microsoft Authentication and Search API')
    .setVersion('1.0')
    .addTag('Microsoft Search NestJS API')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Session Management - Using HTTPS?
  const nodeEnv = configService.get<string>('NODE_ENV');
  const isSessionSecure = nodeEnv === 'production';

  // Session Management - This will be removed for the Production.
  app.use(
    session({
      secret:
        configService.get<string>('SESSION_SECRET_KEY') ||
        crypto.randomBytes(32).toString('hex'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: isSessionSecure,
        maxAge: 60 * 60 * 1000, // 1 hour
      },
    }),
  );

  const filters: ExceptionFilter<any>[] = [
    new UnauthorizedExceptionFilter(),
    new InternalServerErrorExceptionFilter(),
  ];

  filters.forEach((filter) => app.useGlobalFilters(filter));

  await app.listen(3000);
}
/* eslint-disable @typescript-eslint/no-floating-promises */
bootstrap();
