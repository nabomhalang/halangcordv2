declare module 'discord.js' {
  interface Client {
    commands?: Collection<string, ApplicationCommand>
    messageCommands?: Collection<string, MessageCommand>
    buttons?: Collection<string, DiscordButton>
  }
}

export { }