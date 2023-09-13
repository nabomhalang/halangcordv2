import { Controller, Get, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { DiscordService } from './discord.service';

@ApiTags('discord')
@Controller('discord')
export class DiscordController {
  constructor(private readonly discord: DiscordService, private readonly config: ConfigService) { }

  @Get('/invite')
  @Redirect('')
  async invite() {
    return {
      url: this.config.get<string>('DISCORD_BOT_INVITE')
    }
  }
}
