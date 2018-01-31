import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ApplicationModule} from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const options = new DocumentBuilder()
    .setTitle('all-reports')
    .setDescription('All Reports REST API')
    .setVersion('1.0')
    .addTag('all-reports')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api', app, document);

  await app.listen(3001);
}

bootstrap();
