import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import ngrok from 'ngrok';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Corporation Service')
    .setDescription('The Corporation Service API description')
    .setVersion('1.0')
    .addTag('corporations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3002);
  // (async () => {
  //   const url = await ngrok.connect({
  //     proto: 'http',
  //     addr: parseInt(process.env.PORT) || 3002,
  //     authtoken: process.env.NGROK_TOKEN,
  //     region: 'us',
  //   });
  //   const api = await ngrok.getApi();
  //   const tunnels = await api.listTunnels();
  //   console.log(
  //     `Corporation local server is publicly-accessible at ${
  //       Object.values(tunnels)[0][0].public_url
  //     }`,
  //   );
  //   console.log(
  //     `Please combine (ctrl+click) to this link "${
  //       url + '/health'
  //     }" for check health service ^^!`,
  //   );
  // })();
  console.log(await app.getUrl());
}
bootstrap().then(() =>
  console.log(
    `Corporation service has already started on port ${process.env.PORT}`,
  ),
);
