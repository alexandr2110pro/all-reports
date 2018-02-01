import * as swaggerUI from 'swagger-ui-express';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ApplicationModule } from './app/app.module';

import SWAGGER_THEME from './swagger-themes/theme-material.css';

const PORT = Number(process.env.PORT || 9000);

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(ApplicationModule);

  app.setGlobalPrefix('/v1/api');

  const options = new DocumentBuilder()
    .setBasePath('/v1/api')
    .setTitle('Jos API')
    .setDescription('Description...')
    .setVersion('1.0')
    .addTag('JOS')
    .addBearerAuth('authorization', 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // noinspection TypeScriptUnresolvedVariable
  app.use('/api', swaggerUI.serve, swaggerUI.setup(document, {customCss: SWAGGER_THEME}));

  await app.listen(PORT);
}

bootstrap();
