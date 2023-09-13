
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import ApplicationCommand from "src/interface/ApplicationCommand";

@Injectable()
export default class Ping extends ApplicationCommand {
  constructor(private readonly config: ConfigService) {
    super({
      data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Register your account to the nabomhalang.com.")
        .setDMPermission(false),
      execute: async (interactive: ChatInputCommandInteraction): Promise<void> => {
        if (!interactive.inCachedGuild()) return;

        const discordOauth = new ButtonBuilder()
          .setLabel("discord")
          .setStyle(ButtonStyle.Link)
          .setURL(`${process.env.DISCORD_BOT_INVITE}`)

        const googleOauth = new ButtonBuilder()
          .setLabel("google")
          .setStyle(ButtonStyle.Link)
          .setURL(`${process.env.DISCORD_BOT_INVITE}`)

        const kakaoOauth = new ButtonBuilder()
          .setLabel("kakao")
          .setStyle(ButtonStyle.Link)
          .setURL(`${process.env.DISCORD_BOT_INVITE}`)

        const HomepageOauth = new ButtonBuilder()
          .setLabel("HomePage")
          .setStyle(ButtonStyle.Link)
          .setURL(`${process.env.DISCORD_BOT_INVITE}`)

        const OauthButton = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(discordOauth, googleOauth, kakaoOauth, HomepageOauth)

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("Pong!!")
          .setTimestamp()
          .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
          .setFooter({ text: `made by 나봄하랑@nabomhalnag` })

        await interactive.reply({ embeds: [embed], components: [OauthButton] });
      }
    })
  }
}