/* eslint-disable prettier/prettier */
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Registration API Users and Teams vs3')
    .setDescription('This is an Api Users and Teams')
    .setContact('Macmiller Duarte', '', 'macamagolf@gmail.com')
    .setVersion('3.0')
    .addTag('Users and Teams')
    .addBearerAuth()
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options, );
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(8080);
  console.log(`Server is running at ${ await app.getUrl()} 🚀`);
}

bootstrap();
