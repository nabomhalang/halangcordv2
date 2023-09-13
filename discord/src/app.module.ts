import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DiscordModule,
    CommandsModule
  ]
})
export class AppModule { }
