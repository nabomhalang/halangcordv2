import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import ApplicationCommand from "src/interface/ApplicationCommand";

@Injectable()
export default class Invite extends ApplicationCommand {
  constructor(private readonly config: ConfigService) {
    super({
      data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Send invite link!")
        .setDMPermission(false),
      execute: async (interactive: ChatInputCommandInteraction): Promise<void> => {
        if (!interactive.inCachedGuild()) return;

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("💌 Invite the Halnag Discord bot!")
          .setDescription(`halang discord bot is working hard on ${interactive.client.guilds.cache.size} servers.`)
          .setTimestamp()
          .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
          .setFooter({ text: `Made by 나봄하랑@nabomhalang` })

        const inviteButton = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setLabel("invite")
              .setEmoji("✉️")
              .setStyle(ButtonStyle.Link)
              .setURL(`${process.env.DISCORD_BOT_INVITE}`)
          )

        await interactive.reply({ embeds: [embed], components: [inviteButton] });
      }
    })
  }
}