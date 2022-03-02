import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000);

  const config = new DocumentBuilder()
    .setTitle('Corporation Service')
    .setDescription('The Corporation Service API description')
    .setVersion('1.0')
    .addTag('corporations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(await app.getUrl());
}
bootstrap().then(() =>
  console.log(
    `Corporation service has already started on port ${process.env.PORT}`,
  ),
);
