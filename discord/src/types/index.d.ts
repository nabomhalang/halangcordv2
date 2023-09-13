declare module 'discord.js' {
  interface Client {
    slashCommands?: Collection<string, ApplicationCommand>
    messageCommands?: Collection<string, MessageCommand>
    buttons?: Collection<string, DiscordButton>
  }
}

export { }