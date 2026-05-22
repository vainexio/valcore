const client = require('../server.js').client;
const Discord = require('discord.js');
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = Discord;

const settings = require('../storage/settings_.js')
const {prefix, colors, theme, commands, permissions, emojis,} = settings

module.exports = {
  checkCommand: async function (command) {
  
    command = command.toLowerCase();
  let args = command.trim().split(/ +/);
  let content = args[0].toLowerCase(); //message.content.toLowerCase();
  
  for (let i in commands) {
    if (content === prefix+commands[i].Command) {
    return commands[i];
    }
  }
    for (let i in commands) {
        for (let alias in commands[i].Alias) {
          if (content === prefix+commands[i].Alias[alias]) {
            return commands[i];
          }
        }
    }
},
  isCommand: function (command, message) {
  
    command = command.toLowerCase();
  let args = message.content.trim().split(/ +/);
  let content = args[0].toLowerCase(); //message.content.toLowerCase();
  
  function getCommand() {
    for (let i in commands) {
      if (commands[i].Command === command) {
        for (let alias in commands[i].Alias) {
          if (content === prefix+commands[i].Alias[alias]) {
            return commands[i]
          }
        }
      }
    }
  }
  let cmd = commands.find(getCommand)
    return cmd || content === prefix+command;
},
  isMessage: function (command, message) {
    command = command.toLowerCase();
    let content = message.content.toLowerCase();
    let args = message.content.trim().split(/ +/);
    return args[0].toLowerCase() === command;
},
  getTemplate: async function (cmd,perms) {
  var command = cmd.toLowerCase();
  let level = 0
  perms ? level = perms.level : null
  async function getCommand() {
    for (let i in commands) {
      if (prefix+commands[i].Command === command) return commands[i];
      for (let ii in commands[i].Alias) {
        if (prefix+commands[i].Alias[ii] === command) return commands[i];
      }
    }
  }
  
  let foundCmd = await getCommand()
  if (foundCmd && level >= foundCmd.level) {
    let template = "• Command: `"+prefix+foundCmd.Command+' '+foundCmd.Template+"`\n• Aliases: "
    for (let i in foundCmd.Alias) {
      if (foundCmd.Alias[i].length == 0) {
        template = template.replace('\n• Aliases: ','');
      } else {
        foundCmd.Alias.length-1 === Number(i) ? template += "`"+prefix+foundCmd.Alias[i]+"`" : template += "`"+prefix+foundCmd.Alias[i]+"`, "
      }
    }
    template += '\n\n** Description:**\n'+foundCmd.Desc
    if (foundCmd.ex) {
      template += '\n\nExample:\n'
    for (let i in foundCmd.ex) {
      template += '- `'+prefix+foundCmd.ex[i]+'`\n'
    }
    }
    return template;
  } 
    else if (foundCmd && level < foundCmd.level) {
      return emojis.warning+" You lack permissions to view this template."
    }
    else {
    return emojis.warning+' `'+command+'` is not a valid command.'
  }
},
};