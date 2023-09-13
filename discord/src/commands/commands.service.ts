import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import * as path from 'path';
import ApplicationCommand from 'src/interface/ApplicationCommand';

@Injectable()
export class CommandsService {
  constructor(private readonly config: ConfigService) { }

  async registerCommands(client: Client) {
    const slashCommandsFile = readdirSync(path.join(__dirname, "./commands/slashCommands"), { withFileTypes: true }).filter(dir => dir.isDirectory())
    for (const dir of slashCommandsFile) {
      const command = (
        await import(`./commands/slashCommands/${dir.name}`)
      ).default;

      client.slashCommands.set(new command().data.name, new command() as ApplicationCommand);
    }

    const eventDirs = readdirSync(path.join(__dirname, "./events/"), { withFileTypes: true }).filter(dir => dir.isDirectory())
    for (const dir of eventDirs) {
      const eventFiles = readdirSync(path.join(__dirname, `./events/${dir.name}`), { withFileTypes: true }).filter(file => file.name.endsWith(".js"))

      const eventClass = (await import(`./events/${dir.name}/${eventFiles[0].name}`)).default

      if (eventClass !== undefined) {
        const event = new eventClass();

        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args))
        } else {
          client.on(event.name, (...args) => event.execute(...args))
        }
      }
    }

    const rest = new REST({ version: '10' }).setToken(this.config.get<string>("DISCORD_BOT_TOKEN"));

    const commands = client.slashCommands.map(command => command.data.toJSON());

    try {
      Logger.log('Started refreshing application (/) commands.')

      await rest.put(Routes.applicationCommands(this.config.get<string>("DISCORD_APPLICATION_ID")), {
        body: commands,
      })

      Logger.log('Successfully reloaded application (/) commands.')
    } catch (err) {
      console.error(err)
    }
  }
}
