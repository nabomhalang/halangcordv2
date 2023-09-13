import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import ApplicationCommand from "src/interface/ApplicationCommand";

@Injectable()
export default class Ping extends ApplicationCommand {
  constructor(private readonly config: ConfigService) {
    super({
      data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!")
        .setDMPermission(false),
      execute: async (interactive: ChatInputCommandInteraction): Promise<void> => {
        if (!interactive.inCachedGuild()) return;

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("Pong!!")
          .setTimestamp()
          .setDescription(`\`\`\`yaml\nLatency: ${interactive.client.ws.ping}ms\n\`\`\``)
          .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
          .setFooter({ text: `made by 나봄하랑@nabomhalnag` })

        await interactive.reply({ embeds: [embed] });
      }
    })
  }
}