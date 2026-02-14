import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

import { ApplicationsService } from './applications/applications.service';
import { ApplicationsController } from './applications/applications.controller';
import { ApplicationsModule } from './applications/applications.module';

import { SearchModule } from './search/search.module';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';

import { EmailsModule } from './emails/emails.module';
import { EmailsController } from './emails/emails.controller';
import { EmailsService } from './emails/emails.service';

import { SwaggerModule } from '@nestjs/swagger';

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
    EmailsModule,
    SwaggerModule,
  ],
  controllers: [
    AuthController,
    UserController,
    ApplicationsController,
    EmailsController,
    SearchController,
  ],
  providers: [
    AuthService,
    UserService,
    ApplicationsService,
    EmailsService,
    SearchService,
  ],
})
export class AppModule {}
