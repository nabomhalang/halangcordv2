import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import ApplicationCommand from 'src/interface/ApplicationCommand';

@Injectable()
export class DiscordService {
  client: Client;
  ready: boolean = false;
  constructor(private readonly config: ConfigService) { }

  async connect(): Promise<Client> {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
      partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
      ],
    })

    this.client.slashCommands = new Collection<string, ApplicationCommand>()
    // this.client.messageCommands = new Collection<string, MessageCommand>()
    // this.client.buttons = new Collection<string, DiscordButton>()

    this.client.on('ready', () => {
      Logger.log(`Discord connected with handle ${this.client.user.tag}`);
      this.ready = true;
    });

    this.client.login(this.config.get<string>("DISCORD_BOT_TOKEN"));

    return this.client;
  }

  async isGuildAvailable(guildId: string): Promise<boolean> {
    const guild = await this.client.guilds.resolve(guildId);
    return !!guild;
  }

  async isChannelAvailable(channelId: string): Promise<boolean> {
    const channel = await this.client.channels.fetch(channelId);
    return !!channel;
  }
}
