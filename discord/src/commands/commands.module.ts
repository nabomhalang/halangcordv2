import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CommandsService],
  exports: [CommandsService],
  controllers: [CommandsController]
})
export class CommandsModule { }
