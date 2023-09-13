import { Module } from '@nestjs/common';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DiscordService, ConfigService],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule { }
