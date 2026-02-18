import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApplicationsModule } from './applications/applications.module';
import { EmailsModule } from './emails/emails.module';
import { SearchModule } from './search/search.module';
import { SwaggerModule } from '@nestjs/swagger';
import { LoggerModule } from '@app/shared';
import { HealthModule } from './health/health.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        // Environment
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('production'),
        PORT: Joi.number().default(3000),

        // Azure Authentication
        AZURE_TENANT_ID: Joi.string().required(),
        AZURE_CLIENT_ID: Joi.string().required(),
        AZURE_CLIENT_SECRET: Joi.string().required(),
        AZURE_REDIRECT_URI: Joi.string().required(),

        // Session Management
        SESSION_SECRET_KEY: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
    AuthModule,
    UserModule,
    ApplicationsModule,
    EmailsModule,
    SearchModule,
    SwaggerModule,
    LoggerModule,
    HealthModule,
    PrometheusModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
