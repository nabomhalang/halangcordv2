import { ChatInputCommandInteraction, ContextMenuCommandBuilder, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";


export default class ApplicationCommand {
  data: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  hasSubcommands?: boolean;
  execute?: (interaction: ChatInputCommandInteraction) => Promise<void> | void;

  /**
   *  @param {{
   *    data: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder,
   *    hasSubCommands?: boolean,
   *    execute?: (interactive: ChatInputCommandInteraction) => Promise<void> | void
   * }} options 
   */
  constructor(options: {
    data: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder
    hasSubCommands?: boolean
    execute?: (interactive: ChatInputCommandInteraction) => Promise<void> | void
  }) {
    this.execute = options.execute;
    this.data = options.data;
    this.hasSubcommands = options.hasSubCommands;
  }
}