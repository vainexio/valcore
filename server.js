//Glitch Project
const express = require('express');
const https = require('https');
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const moment = require('moment')
const HttpsProxyAgent = require('https-proxy-agent');
const url = require('url');
const discordTranscripts = require('discord-html-transcripts');
const wait = require('node:timers/promises').setTimeout;
const cc = 'KJ0UUFNHWBJSE-WE4GFT-W4VG'
const fs = require('fs-extra')

//
//Discord
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const {WebhookClient, Permissions, Client, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = Discord; 
//const moment = require('moment');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES);
const client = new Client({ intents: myIntents , partials: ["CHANNEL"] });

//Env
const token = process.env.SECRET;
const open_ai = process.env.OPEN_AI
const mongooseToken = process.env.MONGOOSE;

async function startApp() {
    let promise = client.login(token)
    if (cc !== process.env.CC) {
      console.error("Discord bot login | Invalid Token 2");
      process.exit(1);
    }
    promise.catch(function(error) {
      console.error("Discord bot login | " + error);
      process.exit(1);
    });
}
startApp();
let cmd = true

let guildSchema
let guildModel

let tokenSchema
let tokenModel

//When bot is ready
client.on("ready", async () => {
  await mongoose.connect(mongooseToken,{keepAlive: true});
  let channel = await getChannel('1109020434810294345')
  const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
  });
  guildSchema = new mongoose.Schema({
    id: String,
    key: String,
    author: String,
    maxTokens: Number,
    verifiedRole: String,
    users: [],
  })
  tokenSchema = new mongoose.Schema({
    id: String,
    access_token: String,
    refresh_token: String,
    createdAt: String,
    expiresAt: String,
  })
  guildModel = mongoose.model("ValcoreBackup_Model", guildSchema);
  tokenModel = mongoose.model("ValcoreBackup_Token", tokenSchema);
  
  if (slashCmd.register) {
  let discordUrl = "https://discord.com/api/v10/applications/"+client.user.id+"/commands"
  let headers = {
    "Authorization": "Bot "+token,
    "Content-Type": 'application/json'
  }
  
  for (let i in slashes) {
    await sleep(4000)
    let json = slashes[i]
    let response = await fetch(discordUrl, {
      method: 'post',
      body: JSON.stringify(json),
      headers: headers
    });
    console.log(response.status+' '+json.name)
    response = await response.json();
  }
    for (let i in slashCmd.deleteSlashes) {
      let deleteUrl = "https://discord.com/api/v10/applications/"+client.user.id+"/commands/"+slashCmd.deleteSlashes[i]
      let deleteRes = await fetch(deleteUrl, {
        method: 'delete',
        headers: headers
      })
      deleteRes = await deleteRes.json();
      console.log(deleteRes.status)
    }
  }
  console.log('Successfully logged in to discord bot.')
  client.user.setPresence({ status: 'online', activities: [{ name: 'Users', type: "LISTENING" }] });
  
  if (!process.env.CC || cc !== process.env.CC) process.exit(1);
})
module.exports = {
  client: client,
  getPerms,
  noPerms,
};

let listener = app.listen(process.env.PORT, function() {
   console.log('Not that it matters but your app is listening on port ' + listener.address().port);
});
/*
░██████╗███████╗████████╗████████╗██╗███╗░░██╗░██████╗░░██████╗
██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗░██║██╔════╝░██╔════╝
╚█████╗░█████╗░░░░░██║░░░░░░██║░░░██║██╔██╗██║██║░░██╗░╚█████╗░
░╚═══██╗██╔══╝░░░░░██║░░░░░░██║░░░██║██║╚████║██║░░╚██╗░╚═══██╗
██████╔╝███████╗░░░██║░░░░░░██║░░░██║██║░╚███║╚██████╔╝██████╔╝
╚═════╝░╚══════╝░░░╚═╝░░░░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚═════╝░╚═════╝░*/
//LOG VARIABLES
var output = "901759430457167872";
const settings = require('./storage/settings_.js')
const {config, auth, prefix, colors, status, theme, commands, permissions, emojis} = settings
//Slash Commands
const slashCmd = require("./storage/slashCommands.js");
const { slashes } = slashCmd;
/*
██████╗░███████╗██████╗░███╗░░░███╗░██████╗
██╔══██╗██╔════╝██╔══██╗████╗░████║██╔════╝
██████╔╝█████╗░░██████╔╝██╔████╔██║╚█████╗░
██╔═══╝░██╔══╝░░██╔══██╗██║╚██╔╝██║░╚═══██╗
██║░░░░░███████╗██║░░██║██║░╚═╝░██║██████╔╝
╚═╝░░░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═════╝░*/
async function getPerms(member, level) {
  let highestPerms = null
  let highestLevel = 0
  let sortedPerms = await permissions.sort((a,b) => b.level-a.level)
  for (let i in sortedPerms) {
    if (permissions[i].id === member.id && permissions[i].level >= level) {
      highestLevel < permissions[i].level ? (highestPerms = permissions[i], highestLevel = permissions[i].level) : null
    } else if (member.user && member.roles.cache.some(role => role.id === permissions[i].id) && permissions[i].level >= level) {
      highestLevel < permissions[i].level ? (highestPerms = permissions[i], highestLevel = permissions[i].level) : null
    }
  }
  
  if (highestPerms) return highestPerms;
}
async function guildPerms(member, perms) {
  if (member.permissions.has(perms)) {
    return true;
  } else {
    return false;
  }
}
function noPerms(message) {
  let Embed = new MessageEmbed()
  .setColor(colors.red)
  .setDescription("You lack special permissions to use this command.")
  return Embed;
}
/*
███████╗██╗░░░██╗███╗░░██╗░█████╗░████████╗██╗░█████╗░███╗░░██╗░██████╗
██╔════╝██║░░░██║████╗░██║██╔══██╗╚══██╔══╝██║██╔══██╗████╗░██║██╔════╝
█████╗░░██║░░░██║██╔██╗██║██║░░╚═╝░░░██║░░░██║██║░░██║██╔██╗██║╚█████╗░
██╔══╝░░██║░░░██║██║╚████║██║░░██╗░░░██║░░░██║██║░░██║██║╚████║░╚═══██╗
██║░░░░░╚██████╔╝██║░╚███║╚█████╔╝░░░██║░░░██║╚█████╔╝██║░╚███║██████╔╝
╚═╝░░░░░░╚═════╝░╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░╚═╝░╚════╝░╚═╝░░╚══╝╚═════╝░*/
//Send Messages
const sendMsg = require('./functions/sendMessage.js')
const {sendChannel, sendUser} = sendMsg
//Functions
const get = require('./functions/get.js')
const {getTime, chatAI, getNth, getChannel, getGuild, getUser, getMember, getRandom, getColor} = get
//Command Handler
const cmdHandler = require('./functions/commands.js')
const {checkCommand, isCommand, isMessage, getTemplate} = cmdHandler
//Others
const others = require('./functions/others.js')
const {makeCode, stringJSON, fetchKey, ghostPing, sleep, moderate, getPercentage, getPercentageEmoji, randomTable, scanString, requireArgs, getArgs, makeButton, makeRow} = others
//Roles Handler
const roles = require('./functions/roles.js')
const {getRole, addRole, removeRole, hasRole} = roles
/*
░█████╗░██╗░░░░░██╗███████╗███╗░░██╗████████╗  ███╗░░░███╗███████╗░██████╗░██████╗░█████╗░░██████╗░███████╗
██╔══██╗██║░░░░░██║██╔════╝████╗░██║╚══██╔══╝  ████╗░████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝░██╔════╝
██║░░╚═╝██║░░░░░██║█████╗░░██╔██╗██║░░░██║░░░  ██╔████╔██║█████╗░░╚█████╗░╚█████╗░███████║██║░░██╗░█████╗░░
██║░░██╗██║░░░░░██║██╔══╝░░██║╚████║░░░██║░░░  ██║╚██╔╝██║██╔══╝░░░╚═══██╗░╚═══██╗██╔══██║██║░░╚██╗██╔══╝░░
╚█████╔╝███████╗██║███████╗██║░╚███║░░░██║░░░  ██║░╚═╝░██║███████╗██████╔╝██████╔╝██║░░██║╚██████╔╝███████╗
░╚════╝░╚══════╝╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░  ╚═╝░░░░░╚═╝╚══════╝╚═════╝░╚═════╝░╚═╝░░╚═╝░╚═════╝░╚══════╝*/
//ON CLIENT MESSAGE

const messageCount = new Map();
const lastMessages = new Map();
const spamThreshold = 8;
const cooldown = 10000;

/*client.on("messageCreate", async (message) => {
  if (message.content.toLowerCase() === '!invite') {
    console.log('received hehe')
    let row = new MessageActionRow().addComponents(
        new MessageButton().setURL('https://discord.com/api/oauth2/authorize?client_id='+client.user.id+'&permissions=8&scope=bot').setStyle('LINK').setLabel("Invite Bot"),
      );
    
    message.reply({components: [row]})
  }
  if (message.channel.type === 'DM' || message.author.bot) return;
  //
  let backupVouch = config.backupVouches.find(v => v.original === message.channel.id)
  if (backupVouch && backupVouch.condition(message)) {
    let templates = null
    let tempMsg = null
    if (backupVouch.format) {
      templates = await getChannel(config.channels.templates)
      tempMsg = await templates.messages.fetch(backupVouch.format)
    }
      //
      let attachments = Array.from(message.attachments.values())
      let webhook = new WebhookClient({ url: backupVouch.backup})
      let files = []

      for (let i in attachments) { files.push(attachments[i].url) }

      webhook.send({
        content: tempMsg ? tempMsg.content.replace('{user}',message.author.toString()).replace('{message}',message.content) : message.content+'\n\n'+message.author.toString(),
        username: message.author.tag,
        avatarURL: message.author.avatarURL(),
        files: files,
      })
  }
  //
  if (!await guildPerms(message.member,["MANAGE_GUILD"]) && !/^\W/.test(message.content) && !message.content.toLowerCase().startsWith('owo')) {
    const userId = message.author.id;
    const userMessage = message.content;

    const lastMessage = lastMessages.get(userId);

    if (lastMessage === userMessage) {
      messageCount.set(userId, (messageCount.get(userId) || 0) + 1);
    } else {
      lastMessages.set(userId, userMessage);
      messageCount.set(userId, 1);
    }
  }
  if (isCommand('protocol',message)) {
    if (!await getPerms(message.member,4)) return message.reply({content: emojis.warning+" You can't do that sir"});
    let members = await message.guild.members.fetch().then(async mems => {
      let members = []
      mems.forEach(mem => members.push(mem))
      
      console.log('changing')
      let success = 0
      let failed = 0
      let doc = await guildModel.findOne({id: message.guild.id}) 
      for (let i in members) {
        let mem = members[i]
          try {
            let found = doc.users.find(u => u === mem.user.id)
            if (!found && !mem.user.bot) {
              doc.users.push(mem.user.id)
              success++
            } else {
              failed++
            }
          } 
        catch (err) {
          failed++
          console.log(err)
        }
      }
      let toDelete = []
      for (let i in doc.users) {
        let user = doc.users[i]
        if (user === null) toDelete.push(i)
      }
      toDelete.sort((a, b) => b-a);
      for (let i in toDelete) {
        let index = toDelete[i]
        doc.users.splice(index,1)
      }
      await doc.save();
      console.log('S: '+success,'F: '+failed)
    })
  }
  else if (isCommand('calibrate',message)) {
    if (!await getPerms(message.member,4)) return message.reply({content: emojis.warning+" You can't do that sir"});
    await message.delete();
    let guilds = await guildModel.find()
    
    for (let i in guilds) {
      let guild = guilds[i]
      let toDelete = []
      let safe = 0
      let server = await getGuild(guild.id)
      let error = 0 
      
      for (let i in guild.users) {
        let user = guild.users[i]
        let userData = await tokenModel.findOne({id: user})
        if (!userData) {
          toDelete.push(i)
          if (server) {
            try {
              let member = await getMember(user,message.guild)
              if (member) await removeRole(member,['backup',guild.verifiedRole])
            } catch (err) {
              error++
              console.log(err)
            }
          }
        }
        else safe++
      }
      
      let embed = new MessageEmbed()
      .addFields(
        {name: server ? server.name : 'Unknown', value: 'Changes\n'+guild.users.length+' >> '+(guild.users.length-toDelete.length)}
      )
      
      toDelete.sort((a, b) => b-a);
      for (let i in toDelete) {
        let index = toDelete[i]
        guild.users.splice(index,1)
      }
      embed = new MessageEmbed(embed)
      .addFields(
        { name: 'Total Registered Users', value: guild.users.length.toString() },
        { name: 'Error', value: error.toString() }
      )
      .setFooter({text: guild.id})
      .setColor(colors.none)
      
      message.channel.send({content: '<@'+guild.author+'>', embeds: [embed]})
      //guild.verifiedRole = "Backup"
      await guild.save();
    }
  }
  else if (isCommand('fixrole',message)) {
    let members = await message.guild.members.fetch().then(async mems => {
      let members = []
      mems.forEach(mem => members.push(mem))
      await message.react('🔃')
      
      let doc = await guildModel.findOne({id: message.guild.id})
      let data = {
        total: 0,
        calibrated: 0,
        failed: 0,
      }
      for (let i in members) {
        let mem = members[i]
        if (await hasRole(mem,[doc.verifiedRole])) {
          data.total++
          try {
            if (!doc.users.find(u => u == mem.id)) {
              await removeRole(mem,[doc.verifiedRole])
              data.calibrated++
            }
            //
          } catch (err) {
            data.failed++
            console.log(err)
          }
        }
      }
      
      await message.reply("Total users checked: "+data.total+"\nCalibrated: "+data.calibrated+"\nFailed: "+data.failed)
    })
  }
  else if (isCommand('check',message)) {
    if (!await getPerms(message.member,4)) return message.reply({content: emojis.warning+" You can't do that sir"});
    let guilds = await guildModel.find()
      let list = []
      let topTen = ""
      let count = 0
      for (let i in guilds) {
        count++
        let guild = guilds[i]
        list.push({id: guild.id, users: guild.users.length, author: guild.author})
      }
    let content = ''
    for (let i in list) {
      let data = list[i]
      let guild = await getGuild(data.id)
      let counter = 0
      if (guild) {
        counter++
        let author = await getMember(data.author,message.guild)
        let emoji = ''
        if (author) {
          emoji = '📄'
          if (await hasRole(author,['1258092843516563521'],message.guild)) {
            emoji += '✅'
            await addRole(author,['1259460543157112832'],message.guild)
          } else {
            emoji += '❌'
          }
        }
        else emoji = '❌'
        
        content += counter+'. '+emoji+' <@'+data.author+'>\n'
      }
    }
    await message.reply(content+'\n\n📄 = in server\n✅ = has @comms role\n❌ = neither')
  }
});//END MESSAGE CREATE*/
client.on('interactionCreate', async inter => {
  if (inter.isCommand()) {
    let cname = inter.commandName
    //Back up
    if (cname === 'help') {
      let botMsg = null
      let row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('desc').setStyle('DANGER').setLabel('Description'),
        new MessageButton().setCustomId('template').setStyle('SECONDARY').setLabel('Template'),
      );
      await inter.reply({content: emojis.loading, ephemeral: true});
      let current = 'desc'
      async function displayHelp(type) {
        let known = []
        let embed = null
      
        embed = new MessageEmbed()
          .setAuthor({name: "Valcore Commands", iconURL: client.user.avatarURL()})
          .setDescription("```js\n[] - Required Argument | () - Optional Argument```")
          .setColor(theme)
          .setTimestamp()
        
        for (let i in commands) {
          if (await getPerms(inter.member, commands[i].level) || commands[i].level === 0) {
      
            let foundCmd = await known.find(a => a === commands[i].Category)
            if (!foundCmd) {
              known.push(commands[i].Category)
              embed = new MessageEmbed(embed)
                .addField(commands[i].Category,'[_]')
            }
          }
        }
        
        for (let i in commands) {
          if (await getPerms(inter.member, commands[i].level) || commands[i].level === 0) {
            let field = embed.fields.find(field => field.name === commands[i].Category)
    
            if (field) {
              let template = commands[i].Template.length > 0 ? ' '+commands[i].Template : ''
              let desc = commands[i].Desc.length > 0 ? ' — *'+commands[i].Desc+'*' : ''
              let fieldValue = field.value.replace('[_]','')
              if (commands[i].slash) {
                embed.fields[embed.fields.indexOf(field)] = {name: commands[i].Category, value: fieldValue+(type === 'desc' ? '</'+commands[i].Command+':'+commands[i].id+'>'+desc : '</'+commands[i].Command+':'+commands[i].id+'>'+template)+'\n'}
              } else {
                embed.fields[embed.fields.indexOf(field)] = {name: commands[i].Category, value: fieldValue+(type === 'desc' ? '`'+prefix+commands[i].Command+'`'+desc : '`'+prefix+commands[i].Command+'`'+template)+'\n'}
              }
            } else {
              console.log("Invalid Category: "+commands[i].Category)
            }
          }
        }
        if (botMsg) return embed;
        !botMsg ? await inter.channel.send({ embeds: [embed], components: [row]}).then(msg => botMsg = msg) : null
      }
      await displayHelp('desc')
      let filter = i => i.user.id === inter.user.id && i.message.id === botMsg.id;
      let collector = botMsg.channel.createMessageComponentCollector({ filter, time: 300000 });
    
      collector.on('collect', async i => {
        if (current !== i.customId) {
          let lb = await displayHelp(i.customId)
          for (let inter in row.components) {
            let comp = row.components[inter]
            comp.customId && comp.customId === i.customId ? comp.setStyle('DANGER') : comp.setStyle('SECONDARY')
          }
          i.update({embeds: [lb], components: [row]});
          current = i.customId
        } else {
          i.deferUpdate();
        }
      });
      collector.on('end', collected => {
        for (let i in row.components) {
          row.components[i].setDisabled(true);
        }
        botMsg.edit({ components: [row] });
      })
    }
    else if (cname === 'register') {
      if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+" You are not on the whitelist"});
      let options = inter.options._hoistedOptions
      //
      let guildId = options.find(a => a.name === 'guild_id')
      let guild = await getGuild(guildId.value)
      if (!guild) return inter.reply({content: emojis.warning+' Cannot find guild. Make sure that the bot is on the server that you wish to register'})
      if (!await guildPerms(await getMember(inter.user.id,guild),["MANAGE_GUILD"])) return inter.reply({content: emojis.warning+' You must have the **MANAGE SERVER** permission in the server that you want to register'})
      let doc = await guildModel.findOne({id: guild.id})
      if (doc) return inter.reply({content: emojis.warning+' This guild was already registered'})
      let docAuthor = await guildModel.findOne({author: inter.user.id})
      if (docAuthor && inter.user.id !== '497918770187075595') return inter.reply({content: emojis.warning+' You are limited to register 1 guild per user'})
      let newDoc = new guildModel(guildSchema)
      newDoc.id = guild.id
      newDoc.key = makeCode(30)
      newDoc.author = inter.user.id
      newDoc.maxTokens = config.guildMaxtokens
      newDoc.verifiedRole = "Backup"
      await newDoc.save()
      
      await inter.reply({content: emojis.on+" Your guild was registered"})
      
      let embed = new MessageEmbed()
      .addFields(
        {name: "Generated Key", value: "This key was generated for the first time. Make sure you save it."},
        {name: "Data", value: "Guild ID `"+guild.id+"`\nGuild Name `"+guild.name+"`"}
      )
      .setColor(theme)
      
      await inter.user.send({content: newDoc.key, embeds: [embed], ephemeral: true})
        .then(msg => inter.followUp({content: emojis.check+' Your access key has been sent via direct message'}))
        .catch(async err => {
        console.log(err)
        inter.followUp({content: emojis.warning+' Unable to send access key via direct message\n```diff\n-'+err+'```'})
        await guildModel.deleteOne({key: newDoc.key})
      })
    }
    else if (cname === 'unregister') {
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      
      let doc = await guildModel.findOne({key: key.value})
      let guild = await getGuild(doc.id)
      if (doc) {
        let embed = new MessageEmbed()
        .setDescription(emojis.off+' Your guild is flagged for termination')
        .setColor(colors.red)
        .addFields(
          {name: "Guild", value: "Guild ID `"+guild?.id+"`\nGuild Name `"+guild?.name+"`"},
          {name: "Registered Users", value: doc.users.length.toString(), inline: true},
          {name: "Author", value: '<@'+doc.author+'>', inline: true},
          {name: "Access Key", value: '```diff\n- '+doc.key.substr(0, doc.key.length-20)+'```'},
        )
        
        let row = new MessageActionRow().addComponents(
          new MessageButton().setCustomId('unregisPrompt-'+inter.user.id).setStyle('DANGER').setLabel("Unregister").setEmoji(emojis.warning),
        );
        await inter.reply({content: doc.id, embeds: [embed], components: [row], ephemeral: true})
      } else {
        await inter.reply({content: emojis.warning+' Invalid access key'})
      }
    }
    else if (cname === 'joinall') {
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      let reason = options.find(a => a.name === 'message')
      let guildId = options.find(a => a.name === 'target_server_id')
      let guild = await getGuild(guildId.value);
      if (!guild) return inter.reply({content: emojis.warning+' Invalid guild ID was provided', ephemeral: true})
      let doc = await guildModel.findOne({key: key?.value})
      if (!doc) doc = await guildModel.findOne({author: inter.user.id})
      if (!doc) return inter.reply({content: emojis.warning+' Invalid key was provided', ephemeral: true})
      if (doc.users.length === 0) return inter.reply({content: emojis.warning+' No users have yet verified to your server', ephemeral: true})
      let failed = 0
      let success = 0
      let already = 0
      let toDelete = []
      await inter.reply({content: emojis.loading+" Joining "+doc.users.length+" users to your new guild **("+guild.name+")**", ephemeral: true})
      
      let ch = await getChannel(config.channels.templates)
      let foundMsg = await ch.messages.fetch('1261206750422503434')
      
      for (let i in doc.users) {
        let userId = doc.users[i]
        try {
          let user = await getUser(userId);
          if (user) {
          let member = await getMember(user.id,guild)
          if (member) already++
          else {
            let data = await tokenModel.findOne({id: userId})
            if (data) {
              if (user) await guild.members.add(user,{accessToken: data.access_token})
                .then(suc => {
                console.log(suc)
                success++
                
                let unverify = new MessageActionRow().addComponents(
                  new MessageButton().setCustomId('unverifPrompt-'+doc.id).setStyle('SECONDARY').setLabel('Unverify'),
                );
                
                let embed = new MessageEmbed()
                .setTitle("🔒 You were joined to a server!")
                .setDescription(
                  "I joined you on a server (**" + guild.name + "**) on your behalf as directed by the server owner.\n\n" +
                  "Feel free to ignore this message if you think that this is appropriate. You can **unverify** yourself at any time."
                )
                .addFields(
                  {name: "Author", value: "<@"+doc.author+">"},
                  {name: "Message", value: reason.value},
                )
                .setColor(colors.red)
                .setFooter({text: "Thank you for your attention"})
                .setTimestamp();
                foundMsg.content = foundMsg.content.replace('{server}',guild.name)
                foundMsg.content = foundMsg.content.replace('{user}','<@'+doc.author+'>')
                foundMsg.content = foundMsg.content.replace('{msg}',reason.value)
                user.send({
                  content: foundMsg.content,
                  components: [unverify]
                });
              })
                .catch(err => {
                toDelete.push(i)
                console.log('Fetch failed '+userId)
                failed++
              })
            } else {
              toDelete.push(i)
              console.log('No data failed '+userId)
              failed++
            }
          }
        } else {
          toDelete.push(i)
          await tokenModel.deleteOne({id: userId})
          console.log('user not found '+userId)
          failed++
        }
        } catch(err) {
          toDelete.push(i)
          await tokenModel.deleteOne({id: userId})
          console.log('Code error: '+err)
          failed++
        }
      }
      toDelete.sort((a, b) => b-a);
      for (let i in toDelete) {
        let index = toDelete[i]
        doc.users.splice(index,1)
      }
      await inter.channel.send({content: emojis.check+' Success: '+success+'\n'+emojis.x+' Deauthorized: '+failed+'\n'+emojis.on+' Already in Server: '+already+'\n🔑 Total Tokens: '+doc.users.length})
      await doc.save();
    }
    else if (cname === 'join') {
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      let reason = options.find(a => a.name === 'message')
      let user = options.find(a => a.name === 'target_user')
      let userId = options.find(a => a.name === 'target_user_id')
      let guildId = options.find(a => a.name === 'target_server_id')
      
      !user ? userId ? user = await getUser(userId.value) : user = null : user = user.user
      if (!user) return inter.reply({content: emojis.warning+' Invalid user ID', ephemeral: true})
      try {
        let guild = await getGuild(guildId.value)
        let doc = await guildModel.findOne({key: key?.value})
        
        if (!doc) doc = await guildModel.findOne({author: inter.user.id})
        if (!doc) return inter.reply({content: emojis.warning+' Invalid access key'})
        if (!guild) return inter.reply({content: emojis.warning+' Invalid guild ID', ephemeral: true})
        
        await inter.reply({content: emojis.loading+' Joining **'+user.tag+'** to '+guild.name, ephemeral: true})
        let data = await tokenModel.findOne({id: user.id})
        let error = false
        
        let ch = await getChannel(config.channels.templates)
        let foundMsg = await ch.messages.fetch('1261206750422503434')
      
        let joinMem = await guild.members.add(user,{accessToken: data.access_token}).catch(err => {
          console.log(err)
          error = true
          inter.followUp({content: emojis.warning+" Failed to join **"+user.tag+"** to "+guild.name+'\n```diff\n-'+err+'```'})
        }).then(msg => {
          if (!error) {
            
            inter.followUp({content: emojis.on+" Successfully joined **"+user.tag+"** to "+guild.name})
            
            let unverify = new MessageActionRow().addComponents(
              new MessageButton().setCustomId('unverifPrompt-'+doc.id).setStyle('SECONDARY').setLabel('Unverify'),
            );
                
            let embed = new MessageEmbed()
            .setTitle("🔒 You were joined to a server!")
            .setDescription(
              "I joined you on a server (**" + guild.name + "**) on your behalf as directed by the server owner.\n\n" +
              "Feel free to ignore this message if you think that this is appropriate. You can **unverify** yourself at any time."
            )
            .addFields(
              {name: "Author", value: "<@"+doc.author+">"},
              {name: "Message", value: reason.value},
            )
            .setColor(colors.red)
            .setFooter({text: "Thank you for your attention"})
            .setTimestamp();
            
            foundMsg.content = foundMsg.content.replace('{server}',guild.name)
            foundMsg.content = foundMsg.content.replace('{user}','<@'+doc.author+'>')
            foundMsg.content = foundMsg.content.replace('{msg}',reason.value)
            
            user.send({
              content: foundMsg.content,
              components: [unverify]
            });
        }
        })
      }
      catch (err) {
        console.log(err)
        inter.channel.send({content: emojis.warning+" Unexpected error occurred\n```diff\n- "+err+"```"})
      }
    }
    else if (cname === 'status') {
      if (!await guildPerms(await getMember(inter.user.id,inter.guild),["MANAGE_GUILD"])) return inter.reply({content: emojis.warning+' You must have the **MANAGE SERVER** permission to use this command.'})
      let options = inter.options._hoistedOptions
      //
      let unverify_button = options.find(a => a.name === 'unverify_button')
      let guildId = options.find(a => a.name === 'guild_id')
      
      let doc = await guildModel.findOne({id: guildId ? guildId.value : inter.guild.id})
      let guild = guildId ? await getGuild(guildId.value) : inter.guild
      if (!doc) return inter.reply({content: emojis.warning+' Unergistered guild ID'})
      let userIndex = doc.users.indexOf(inter.user.id) + 1
      let embed = new MessageEmbed()
      .setColor(colors.none)
      .setTitle(`${guild?.name}`)
      .setThumbnail(guild?.iconURL())
      .addFields(
        //{ name: "Guild ID", value: '`'+doc.id+'`' },
        { name: "Verified Users", value: "```diff\n+ "+doc.users.length+"```", inline: true },
        { name: "Author", value: `<@${doc.author}>`, inline: true },
        { name: "Verified Role", value: doc.verifiedRole !== "Backup" ? `<@&${doc.verifiedRole}>` : `${doc.verifiedRole} *(default)*`, inline: true },
        { name: "Access Key", value: `\`\`\`yaml\n${doc.key.substr(0, doc.key.length - 20)}...\`\`\`` },
      )
      .setFooter({text: doc.users.length+"/"+doc.maxTokens+" verified members"})
      let row = null
      let url = encodeURI('https://discord.com/oauth2/authorize?client_id='+client.user.id+'&response_type=code&redirect_uri='+process.env.live+'&scope=guilds.join+identify&state='+doc.id+'-'+config.version)
      if (unverify_button?.value === 'hide') {
        row = new MessageActionRow().addComponents(
        new MessageButton().setURL(url).setStyle('LINK').setLabel("Verify"),
          new MessageButton().setCustomId('unverifPrompt-'+doc.id).setStyle('SECONDARY').setLabel("Unverify"),
      );
      } else {
        row = new MessageActionRow().addComponents(
          new MessageButton().setURL(url).setStyle('LINK').setLabel("Verify"),
          new MessageButton().setCustomId('unverifPrompt-'+doc.id).setStyle('SECONDARY').setLabel("Unverify"),
        );
      }
      
      await inter.reply({embeds: [embed], components: [row]})
    }
    else if (cname === 'transfer') {
      let options = inter.options._hoistedOptions
      //
      let newServer = options.find(a => a.name === 'new_server_id')
      let key = options.find(a => a.name === 'key')
      let doc = await guildModel.findOne({key: key.value})
      
      await inter.reply({content: emojis.loading+' Transferring data. Please wait.', ephemeral: true})
      
      let guild = newServer ? await getGuild(newServer.value) : inter.guild
      if (!doc || !guild) return inter.channel.send({content: emojis.warning+' Invalid guild/key'})
      let existingGuild = await guildModel.findOne({id: guild.id})
      if (existingGuild && existingGuild.id !== doc.id) return inter.channel.send({content: emojis.warning+' Cannot transfer to an already registered guild.'})
      let embed = new MessageEmbed()
      .addFields(
        { name: 'Guild Transfer', value: emojis.off+' OLD\nID `'+doc.id+'`\n\n'+emojis.on+' NEW\nID `'+newServer.value+'`\nName **'+guild.name+'**'},
        { name: 'Author Transfer', value: emojis.off+' OLD\nID `'+doc.author+'`\n\n'+emojis.on+' NEW\nID `'+inter.user.id+'`\nPing '+inter.user.toString()},
      )
      .setColor(colors.blue)
      
      doc.id = guild.id
      doc.author = inter.user.id
      doc.key = makeCode(30)
      await doc.save()
      await inter.channel.send({content: emojis.check+' Data Transferred', embeds: [embed]})
      
      let embed2 = new MessageEmbed()
      .addFields(
        {name: "Generated Key", value: "This key was generated for the first time. Make sure you save it."},
        {name: "Data", value: "Guild ID `"+guild.id+"`\nGuild Name `"+guild.name+"`"}
      )
      .setColor(theme)
      
      await inter.user.send({content: doc.key, embeds: [embed2]})
        .then(msg => inter.followUp({content: emojis.check+' Your new access key has been sent via direct message'}))
        .catch(async err => {
        console.log(err)
        inter.followUp({content: emojis.warning+' Unable to send access key via direct message. Sending here...\n'+doc.key, embeds: [embed2], ephemeral: true})
      })
    }
    else if (cname === 'merge') {
      if (!await getPerms(inter.member,5)) return inter.reply({content: emojis.warning+" You can't do that sir."});
      let options = inter.options._hoistedOptions
      //
      let newServer = options.find(a => a.name === 'new_server_id')
      let key = options.find(a => a.name === 'key')
      let doc = await guildModel.findOne({key: key.value})
      
      await inter.reply({content: emojis.loading+' Merging data. Please wait.', ephemeral: true})
      
      let guild = newServer ? await getGuild(newServer.value) : inter.guild
      if (!doc || !guild) return inter.channel.send({content: emojis.warning+' Invalid guild/key'})
      let existingGuild = await guildModel.findOne({id: guild.id})
      for (let i in doc.users) {
        let user = doc.users[i]
        if (!existingGuild.users.find(u => u == user)) {
          existingGuild.users.push(user)
        }
      }
      await existingGuild.save()
      console.log('yipi')
    }
    else if (cname === 'getkey') {
      if (!await getPerms(inter.member,5)) return inter.reply({content: emojis.warning+" You can't do that sir."});
      let options = inter.options._hoistedOptions
      //
      let id = options.find(a => a.name === 'id')
      let doc = await guildModel.findOne({id: id.value})
            
      if (!doc) doc = await guildModel.findOne({author: id.value})
      if (!doc) return inter.reply({content: emojis.warning+' Invalid guild/author data'})
      inter.reply({content: doc.key, ephemeral: true})
    }
    else if (cname === 'setlimit') {
      if (!await getPerms(inter.member,5)) return inter.reply({content: emojis.warning+" You can't do that sir."});
      let options = inter.options._hoistedOptions
      //
      let id = options.find(a => a.name === 'id')
      let limit = options.find(a => a.name === 'limit')
      let doc = await guildModel.findOne({id: id.value})
            
      if (!doc) doc = await guildModel.findOne({author: id.value})
      if (!doc) return inter.reply({content: emojis.warning+' Invalid guild/author data'})
      
      let oldLimit = doc.maxTokens
      doc.maxTokens = limit.value
      await doc.save()
      inter.reply({content: emojis.on+" Successfully changed max tokens from **"+oldLimit+"** to **"+limit.value+"**"})
    }
    else if (cname === 'setrole') {
     let options = inter.options._hoistedOptions
     let role = options.find(a => a.name === 'role')
     let key = options.find(a => a.name === 'key')
     let doc = await guildModel.findOne({key: key.value})
     await inter.reply({content: emojis.loading+" Changing role", ephemeral: true})
     if (!doc) return inter.editReply({content: emojis.warning+' Invalid Key', ephemeral: true})
      
      let oldLimit = doc.verifiedRole
      doc.verifiedRole = role.role.id
      await doc.save()
      
      let embed = new MessageEmbed()
      .setDescription(emojis.on+" Successfully changed verified role from "+(oldLimit !== "Backup" ? "<@&"+oldLimit+">" : oldLimit)+" to **"+role.role.toString()+"**")
      .setColor(theme)
      
      await inter.followUp({embeds: [embed]})
    }
    else if (cname === 'check') {
     let options = inter.options._hoistedOptions
     let user = options.find(a => a.name === 'user')
     let doc = await guildModel.findOne({id: inter.guild.id})
     
     if (!doc) return inter.reply({content: emojis.warning+' Guild is not registered!', ephemeral: true})
      let foundUser = doc.users.find(u => u === user.user.id)
      
      if (foundUser) await inter.reply({content: emojis.check+" "+user.user.username+" is verified."})
      else await inter.reply({content: emojis.x+" "+user.user.username+" is not verified."})
    }
    else if (cname === 'addroles') {
      let options = inter.options._hoistedOptions
      //
      let key = options.find(a => a.name === 'key')
      
      let doc = await guildModel.findOne({key: key.value})
      if (!doc) return inter.reply({content: emojis.warning+' Invalid Key', ephemeral: true})
      if (doc.users.length === 0) return inter.reply({content: emojis.warning+' No users have yet verified to your server', ephemeral: true})
      let failed = 0
      let success = 0
      let already = 0
      let role = await getRole(doc.verifiedRole,inter.guild)
      if (!role) await inter.reply({content: `Please set a role called "Backup" or use the /setrole command to use an existig role!`})
      await inter.reply({content: emojis.loading+" Adding **backup** role to "+doc.users.length+" users", ephemeral: true})
      for (let i in doc.users) {
        let userId = doc.users[i]
        try {
          let user = await getUser(userId);
          if (user) {
          let member = await getMember(user.id,inter.guild)
          if (member) {
            if (await hasRole(member,[role.id])) already++ 
            else {
              let notAdded = await addRole(member,[role.id],inter.guild)
              if (notAdded) failed++
              else success++
            }
          } else {
            failed++
          }
        }
        } catch(err) {
          await tokenModel.deleteOne({id: userId})
          console.log('Code error: '+err)
          failed++
        }
        console.log(success+', '+already+', '+failed)
      }

      await inter.channel.send({content: emojis.check+' Added: '+success+'\n'+emojis.x+' Failed: '+failed+'\n'+emojis.on+' Already Added: '+already})
    }
    else if (cname === 'leaderboard') {
      if (!await getPerms(inter.member,2)) return inter.reply({content: emojis.warning+" You are not on the whitelist"});
      await inter.deferReply();
      let guilds = await guildModel.find()
      let list = []
      let topTen = ""
      let count = 0
      for (let i in guilds) {
        count++
        let guild = guilds[i]
        list.push({id: guild.id, users: guild.users.length, author: guild.author})
      }
      list.sort((a, b) => (b.users - a.users))
      let indexCount = 0
      for (let i in list) {
        let data = list[i]
        let guild = await getGuild(data.id)
        if (guild && indexCount < 10) {
          indexCount++
          topTen += '**'+indexCount+'. '+guild.name+'\n**Verified Users: '+data.users+'\nAuthor: <@'+data.author+">\nID: "+data.id+"\n\n"
        }
      }
      let embed = new MessageEmbed()
      .setTitle("Top Guilds")
      .setDescription(topTen)
      .setColor(colors.blue)
      await inter.editReply({embeds: [embed]})
  }
    else if (cname === 'dupvouches') {
      if (!await getPerms(inter.member,4)) return inter.reply({content: emojis.warning+" You can't do that sir."});
      await inter.reply({content: "Duplicating vouches "+emojis.loading});
      let options = inter.options._hoistedOptions
      //
      let oldVouch = options.find(a => a.name === 'old_vouch_id')
      let newVouch = options.find(a => a.name === 'new_vouch_id')
      
      oldVouch = await getChannel(oldVouch.value)
      newVouch = await getChannel(newVouch.value)
      
      
      if (!oldVouch) return inter.editReply({content: emojis.warning+" Invalid old vouch ID", ephemeral: true})
      else if (!newVouch) return inter.editReply({content: emojis.warning+" Invalid new vouch ID", ephemeral: true})
      
      let templates = await getChannel(config.channels.templates)
      let tempMsg = await templates.messages.fetch('1260909239455711375')
      let data = {
        completed: 0,
        f: {
          last_id: null,
          msgSize: 0,
          totalMsg: 0,
        }
      }
      
      let msgSize = 0
      let totalMsg = 0
      
      while (true) {
        const options = { limit: 100 };
        if (data.f.last_id) options.before = data.f.last_id;
        
        //Put to storage
        await oldVouch.messages.fetch(options).then(async messages => {
          data.f.last_id = messages.last()?.id;
          totalMsg += messages.size
          msgSize = messages.size
          let more = []
          await messages.forEach(async (gotMsg) => {
            console.log(gotMsg.author.username+' '+gotMsg.id)
            //if (gotMsg.author.username === 'ayumi haven') {
              more.push(gotMsg)
            //}
          })
          
          for (let i in more) {
            let gotMsg = more[i]
            await sleep(1000)
            
            console.log(gotMsg.embeds[0])
            if (gotMsg.author.bot) continue;
            let embed = new MessageEmbed()
            .setDescription(tempMsg.content.replace('{user}',gotMsg.author.toString()).replace('{message}',gotMsg.content))
            .setColor(colors.none)
            
            let attachments = Array.from(gotMsg.attachments.values())
            let files = []
            for (let i in attachments) { files.push(attachments[i].url) }
            //let webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1261656448493162566/MSbF2G1MLfOP4v5M6TPXtaMlWrI8T7c0Z3yW_TEXwzD1HPih9BwNBbpod4bk5DRgrY_V'})
            //try { await webhook.send({embeds: gotMsg.embeds, files: files, username: gotMsg.author.tag, avatarURL: gotMsg.author.avatarURL(),}) } catch(err) {}
            //try { await newVouch.send({embeds: [gotMsg.embeds[0]]}) } catch (err) {}
            try { await newVouch.send({content: tempMsg.content.replace('{user}',gotMsg.author.toString()).replace('{message}',gotMsg.content), files: files}) } catch (err) {}
            data.completed++
          }
        });
        
        if (msgSize != 100) {
          await inter.channel.send("Successfully duplicated "+data.completed+" vouches")
          break;
        }
      }
  }
  }
  //BUTTONS
  else if (inter.isButton() || inter.isSelectMenu()) {
    let id = inter.customId
    if (id.startsWith("unverifPrompt-")) {
      let guildId = id.replace('unverifPrompt-','')
      let row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('unverify-'+guildId).setStyle('SUCCESS').setLabel("Yes"),
        new MessageButton().setCustomId('cancel').setStyle('DANGER').setLabel("No"),
      );
      await inter.reply({content: 'Are you sure you want to unverify yourself from this server?', ephemeral: true, components: [row]})
    }
    else if (id.startsWith("unregisPrompt-")) {
      let userId = id.replace('unregisPrompt-','')
      let row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('unregister-'+inter.message.content).setStyle('SUCCESS').setLabel("Yes"),
        new MessageButton().setCustomId('cancel').setStyle('DANGER').setLabel("No"),
      );
      await inter.reply({content: 'Are you sure you want to unregister this server?\n> This action is irreversible!', ephemeral: true, components: [row]})
    }
    //
    else if (id.startsWith('unregister-')) {
      let guildId = id.replace('unregister-','')
      let userId = inter.user.id
      let doc = await guildModel.findOne({id: guildId})
      let guild = await getGuild(doc.id)
      if (!doc) return inter.update({content: emojis.warning+' Unergistered guild ID', components: []})
      
      let embed = new MessageEmbed()
        .setDescription(emojis.off+' This guild data was terminated by '+inter.user.toString())
        .setColor(colors.red)
        .addFields(
          {name: "Guild", value: "Guild ID `"+guild?.id+"`\nGuild Name `"+guild?.name+"`"},
          {name: "Registered Users", value: doc.users.length.toString(), inline: true},
          {name: "Author", value: '<@'+doc.author+'>', inline: true},
          {name: "Access Key", value: '```diff\n- '+doc.key.substr(0, doc.key.length-20)+'```'},
        )
      await guildModel.deleteOne({id: guildId})
      await inter.reply({embeds: [embed]})
    }
    else if (id.startsWith('unverify-')) {
      let guildId = id.replace('unverify-','')
      let userId = inter.user.id
      let guild = await getGuild(guildId)
      let doc = await guildModel.findOne({id: guildId})
      if (!doc) return inter.update({content: emojis.warning+' Unergistered guild ID', components: []})
      let user = doc.users.find(u => u === userId)
      if (!user) return inter.update({content: emojis.warning+' You are not verified on this server', components: []})
      doc.users.splice(doc.users.indexOf(userId),1)
      await doc.save();
      await inter.update({content: emojis.check+' You have been **unverified** from this server!\nClick the button again if you wish to reverify', components: []})
      await sleep(1000)
      let member = await getMember(inter.user.id,guild)
      await removeRole(member,[doc.verifiedRole,"sloopie"],guildId)
    }
    else if (id.startsWith('cancel')) {
      await inter.update({content: 'Interaction was cancelled.', components: []})
    }
  }
});

process.on('unhandledRejection', async error => {
  console.log(error);
  let caller_line = error.stack.split("\n");
  let index = await caller_line.find(b => b.includes('/app'))
  let embed = new MessageEmbed()
  .addField('Caller Line','```'+(index ? index : 'Unknown')+'```',true)
  .addField('Error Code','```css\n[ '+error.code+' ]```',true)
  .addField('Error','```diff\n- '+(error.stack >= 1024 ? error.stack.slice(0, 1023) : error.stack)+'```')
  .setColor(colors.red)
  
  let channel = await getChannel(output)
  channel ? channel.send({embeds: [embed]}).catch(error => error) : null
});

/*//Fetch tokens
async function handleTokens() {
  let tokens = await tokenModel.find()
  let data = {
    refreshed: 0,
    tokens: 0,
    failed: 0,
  }
  try {
    let refreshedTokens = []
    for (let i in tokens) {
      let user = tokens[i]
      //Handle delay
      if (data.refreshed == tokens.length/2) {
        await sleep(600000)
      } else {
        await sleep(900) // was 200ms
      }
      //
      data.tokens++
      let time = getTime(new Date())
      
      //get expiration
      if (time >= user.expiresAt) {
        let data_1 = new URLSearchParams();
        data_1.append('client_id', client.user.id);
        data_1.append('client_secret', process.env.clientSecret);
        data_1.append('grant_type', 'refresh_token');
        data_1.append('refresh_token', user.refresh_token);
        let headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        //fetch token
        let response = await fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1, headers: headers })
        //if valid
        if (response.status === 200) {
        response = await response.json();
          user.access_token = response.access_token
          user.refresh_token = response.refresh_token
          user.createdAt = getTime(new Date())
          user.expiresAt = getTime(new Date().getTime()+(response.expires_in*1000))
          data.refreshed++
          await user.save();
        //if not valid
        }
        else {
          console.log(user.id,'⚠️ Failed: '+response.status+' - '+response.statusText)
          console.log(user)
          await tokenModel.deleteOne({id: user.id})
          data.failed++
        }
      }
    
  }
  
  let logs = await getChannel("1116922703597817888")
  let embed = new MessageEmbed()
  .addField("Statistics",`Refreshed Tokens: ${data.refreshed}\nTotal Tokens: ${data.tokens}\nFailed Tokens: ${data.failed}`)
  .setColor(colors.none)
  
  logs.send({embeds: [embed]})
  } catch (err) {
    console.log(err)
    let logs = await getChannel("1116922703597817888")
    logs.send(emojis.warning+' Unexpected error occurred while trying to refresh tokens\n```diff\n- '+err+'```')
  }
}*/

function respond(res, data) {
  const htmlTemplate = fs.readFileSync('public/new-output.html', 'utf8');

  const modifiedHtml = htmlTemplate
  .replace(/\$\{pageTitle\}/g,(data.guild?.name ? data.guild.name.toUpperCase() : 'ERROR').replace(/^(.{10}).+/, "$1..."))
  .replace(/\$\{imageUrl\}/g, data.guild && data.guild.iconURL() ? data.guild.iconURL() : "https://upload.wikimedia.org/wikipedia/commons/3/37/Sad-face.png")
  .replace(/\$\{bannerUrl\}/g, data.guild && data.guild.bannerURL() ? data.guild.bannerURL() : "")
  .replace(/\$\{subtext\}/g, data.text.toUpperCase())
  .replace(/\$\{subtextColor\}/g, data.color)
  .replace(/\$\{subtext2\}/g, data.text2 ? data.text2.toUpperCase() : '');
  
  res.send(modifiedHtml);
}
app.get('/backup', async function (req, res) {
  if (!req.query.state) return respond(res, {text: "Unknown server ID", color: '#ff4b4b'})
  if (!req.query.state.includes('-'+config.version)) return respond(res, {text: "Outdated Link", color: '#ff4b4b'})
  req.query.state = req.query.state.replace('-'+config.version,'')
  //return respond({text: "SYSTEM IS OFFLINE", color: 'red', guild: {name: func => { return 'Error'}}})
  try {
    let guild = await getGuild(req.query.state)
    console.log('received')
    let data_1 = new URLSearchParams();
    data_1.append('client_id', client.user.id);
    data_1.append('client_secret', process.env.clientSecret);
    data_1.append('grant_type', 'authorization_code');
    data_1.append('redirect_uri', process.env.live);
    data_1.append('scope', 'identify');
    data_1.append('code', req.query.code);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const clientIp = ip.split(',')[0].trim(); // Extract the first IP address
    console.log(`Client IP Address: ${clientIp}`);
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    //fetch token
    //
    let response = await fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1, headers: headers })

    response = await response.json();
    //console.log(response)
    //fetch user
    let user = await fetch('https://discord.com/api/users/@me',{ headers: {'authorization': `Bearer ${response.access_token}`}})
    user = await user.json();
    console.log(user?.username+' - '+user?.id)
    if (!user || user?.message?.includes('401')) return respond(res, {text: 'Link expired', color: '#ff4b4b', guild: guild})
    if (!user.id) {
      respond(res, {text: 'Critial Error - Please Report to Dev', color: '#ff4b4b', guild: guild})
      print(user)
      return
    }
    //fetch model
    if (!guildModel) return respond(res, {text: "VALCORE is waking up.", text2: "Please click the button again!", color: '#ff8800', guild: guild})
    let doc = await guildModel.findOne({id: req.query.state})
    if (!doc) return respond(res, {text: "Unregistered guild", color: '#ff4b4b'})
    let userData = await tokenModel.findOne({id: user.id})
    let member = await getMember(user.id,guild)
    if (!member) return respond(res, {text: "Not in the server", color: '#ff8800', guild: guild})
    //MSG
    let channel = await getChannel('1109020436026634265')
    let template = await getChannel('1109020434810294344')
    let msg = await template.messages.fetch('1258073676792856597')
    let content = msg.content.replace('{user}','<@'+member.id+'>')
    //
    if (userData) {
      userData.access_token = response.access_token
      userData.refresh_token = response.refresh_token
      userData.createdAt = getTime(new Date())
      userData.expiresAt = getTime(new Date().getTime()+(response.expires_in*1000))
      await userData.save()
    }
    //
    else {
      //
      let newUser = new tokenModel(tokenSchema)
      newUser.id = user.id
      newUser.access_token = response.access_token
      newUser.refresh_token = response.refresh_token
      newUser.createdAt = getTime(new Date())
      newUser.expiresAt = getTime(new Date().getTime()+(response.expires_in*1000))
      await newUser.save()
    }
    if (await hasRole(member,['restricted'],guild)) return respond(res, {text: 'Cannot verify due to restriction', color: '#ff4b4b', guild: guild})
    if (doc.users.length >= doc.maxTokens) return respond(res, {text: 'Reached maximum tokens<br />('+doc.users.length+'/'+doc.maxTokens+')', color: '#ff4b4b', guild: guild})
    //else if (!guildToken && doc.users.length >= config.guildMaxtokens) return respond(res, {text: 'Reached maximum tokens<br />('+doc.users.length+'/1000)', color: '#ff4b4b', guild: guild})
    let foundUser = doc.users.find(u => u === user.id)
    let customMsg = config.customMessages.find(c => c.id === user.id)
    if (!foundUser) {
      doc.users.push(user.id)
    }
    else {
      let userIndex = doc.users.indexOf(user.id) + 1
      let notAdded = member ? await addRole(member,[doc.verifiedRole,"sloopie"],guild) : null
      if (notAdded) console.log('Not added',notAdded)
      return respond(res, {text: customMsg ? customMsg.msg : 'Already verified', text2: '<b>'+getNth(userIndex)+'</b> member', color: '#ff8800', guild: guild})
    }
    //
    await doc.save();
    //add role
    await addRole(member,[doc.verifiedRole,"sloopie"],guild)
    if (guild.id == '1109020434449575936') channel.send({content: content})
    //logs
    let userIndex = doc.users.indexOf(user.id) + 1
    respond(res, {text: customMsg ? customMsg.msg : 'You have been verified', text2: '<b>'+getNth(userIndex)+'</b> member', color: '#b6ff84', guild: guild})
    
    let unverify = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('unverifPrompt-'+doc.id).setStyle('SECONDARY').setLabel('Unverify'),
    );
    
    let embed = new MessageEmbed()
    .setTitle("🔒 What is the Verification for?")
    .setDescription(
        "You have just completed the verification process! This allows our bot to **join you on servers on your behalf**.\n\n" +
        "If you do not agree to this, you can **unverify** yourself from **" + guild.name + "** at any time."
    )
    .setThumbnail(guild.iconURL())
    .setColor(colors.red)
    .setFooter({text: "Thank you for your attention"}) 
    .setTimestamp();
    
    let ch = await getChannel(config.channels.templates)
    let foundMsg = await ch.messages.fetch('1261206731313385494')
    foundMsg = foundMsg.content
    foundMsg = foundMsg.replace('{server}',guild.name)
    foundMsg = foundMsg.replace('{user}','<@'+doc.author+'>')
    console.log(doc.author)
    await member.user.send({
      content: foundMsg,
      components: [unverify]
    });
  }
  catch (err) {
    console.log(err)
    res.status(400).send({'error': err.message})
  }
  //
});
app.get('/', async function (req, res) {
  res.status(200).send({ status: "VALCORE is up and running!" })
});
