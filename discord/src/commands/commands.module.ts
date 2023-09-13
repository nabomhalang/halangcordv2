import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CommandsService, ConfigService],
  exports: [CommandsService],
})
export class CommandsModule { }
