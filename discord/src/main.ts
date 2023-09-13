import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { rateLimit } from 'express-rate-limit';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as Express from 'express';
import { DiscordService } from './discord/discord.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const discordService = app.get(DiscordService);

  if (configService.get<string>("NODE_ENV") !== "production") {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Halangcord API')
      .setDescription('halnagcord api docs')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));

  app.use(Express.urlencoded({ limit: '50mb', extended: true }));
  app.use(Express.json({ limit: '50mb' }));
  app.set('trust proxy', 1)

  app.useGlobalPipes(new ValidationPipe({
    validatorPackage: require("@nestjs/class-validator"),
    transformerPackage: require("class-transformer"),
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  }));

  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', '*'),
    methods: configService.get<string>('CORS_METHODS', 'GET, POST, PUT, DELETE, PATCH'),
    allowedHeaders: configService.get<string>('CORS_HEADERS', 'Content-Type, Accept, Authorization, Set-Cookie, cookie'),
    credentials: configService.get<boolean>('CORS_CREDENTIALS', true),
    preflightContinue: configService.get<boolean>('CORS_PREFLIGHT', false),
    optionsSuccessStatus: configService.get<number>('CORS_OPTIONS_STATUS', 204),
  });

  await app.listen(configService.get<number>("PORT", 3000), async () => {
    Logger.log(`Server listening on port ${configService.get<string>("PORT")}`);
    Logger.log(`Bot invite link: ${configService.get<string>("DISCORD_BOT_INVITE")}`);
    const client = await discordService.connect();
  });
}

bootstrap();
