import { BaseInteraction, ChatInputCommandInteraction, Events } from "discord.js";
import Event from "src/interface/Events"

export default class InteractionCreate extends Event {
  constructor() {
    super({
      name: Events.InteractionCreate,
      once: false,
      execute: async (interaction: BaseInteraction) => {
        if (!interaction.isCommand() || !interaction.inCachedGuild()) return;

        if (!interaction.client.slashCommands.has(interaction.commandName)) return;

        const command = await interaction.client.slashCommands.get(interaction.commandName)

        if (!command) return

        await command.execute(interaction as ChatInputCommandInteraction)
      }
    })
  }
}