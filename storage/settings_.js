//const others = require('../functions/others.js')
const Discord = require('discord.js');
const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = Discord;
let colors = {
  red: "#ff5e5e",
  blue: "#6b8eff",
  green: "#00ff04",
  yellow: "#fff4a1",
  orange: "#ff6300",
  purple: "#b200ff",
  pink: "#ff00d6",
  cyan: "#00feff",
  black: "#000000",
  white: "#ffffff",
  lime: "#7ebb82",
  none: "#2B2D31",
}
let emojis = {
  check: '<a:check:969936488739512340>',
  x: '<a:Xmark:969401924736651284>',
  loading: '<a:loading2:976650648600854538>',
  warning: '<:S_warning:1108743925012902049>',
  online: '<:online_:1004014930959286342>',
  idle: '<:Idle_:1004014897417424938>',
  dnd: '<:dnd_:1004017480613773422>',
  offline: '<:offline_:1004015005282340916>',
  on: '<:on:1107664866484953178>',
  off: '<:off:1107664839372964010>',
  
  empty1: '<:first_empty:997879999174549514>',
  empty2: '<:middle_empty:997879976093294622>',
  empty3: '<:last_empty:997880276363526294> ',
  half1: '<:first_half:997879008517705738>',
  half2: '<:middle_half:997879179603365971>',
  half3: '<:last_half:997879147856662548>',
  full1: '<:first_full:997879046560034906>',
  full2 : '<:middle_full:997879113522090064>',
  full3: '<:last_full:997879088553414736>',
}
module.exports = {
  config: {
    customMessages: [],
    version: '2',
    guildMaxtokens: 500,
    channels: {
      chat: '1047454193595732055',
      templates: '1109020434810294344',
    },
  },
  auth: {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+process.env.COC,
      'Content-Type': 'application/json'
    }
  },
  commands: [
    {
      Command: "register",
      Template: "[server_id]",
      Alias: [],
      Category: "Main",
      Desc: 'Register your server',
      ex: [''],
      level: 0,
      id: '1234992096050413598',
      slash: true,
    },
    {
      Command: "unregister",
      Template: "[key]",
      Alias: [],
      Category: "Main",
      Desc: 'Unregister your server',
      ex: [''],
      level: 0,
      id: '1234992106066415696',
      slash: true,
    },
    {
      Command: "status",
      Template: "(guild_id) (unverify_button)",
      Alias: [],
      Category: "Main",
      Desc: 'Check status of your server',
      ex: [''],
      level: 0,
      id: '1234990408933707796',
      slash: true,
    },
    {
      Command: "joinall",
      Template: "[target_guild_id] [message] (key)",
      Alias: [],
      Category: "Main",
      Desc: 'Join all your verified members to a server',
      ex: [''],
      level: 0,
      id: '1234990378109898782',
      slash: true,
    },
    {
      Command: "join",
      Template: "[target_guild_id] [message] [user] (key)",
      Alias: [],
      Category: "Main",
      Desc: 'Join 1 verified member to a server',
      ex: [''],
      level: 0,
      id: '1234990388519899156',
      slash: true,
    },
    {
      Command: "transfer",
      Template: "[new_server_id] [key]",
      Alias: [],
      Category: "Main",
      Desc: 'Transfer server data to another server',
      ex: [''],
      level: 0,
      id: '1234990398888480850',
      slash: true,
    },
    {
      Command: "setrole",
      Template: "[key] [role]",
      Alias: [],
      Category: "Main",
      Desc: 'Set verified role',
      ex: [''],
      level: 0,
      id: '1248659549066367069',
      slash: true,
    },
    {
      Command: "addroles",
      Template: "[key]",
      Alias: [],
      Category: "Main",
      Desc: 'Add verified role to all verified members',
      ex: [''],
      level: 0,
      id: '1234990440755757231',
      slash: true,
    },
    {
      Command: "check",
      Template: "[user]",
      Alias: [],
      Category: "Main",
      Desc: 'Check if a user is verified to your server',
      ex: [''],
      level: 0,
      id: '1248662787865968772',
      slash: true,
    },
    {
      Command: "i_got_termed",
      Template: "",
      Alias: [],
      Category: "Main",
      Desc: 'Instructions on what to do if you got termed',
      ex: [''],
      level: 0,
      id: '1391422887231098880',
      slash: true,
    },
  ],
  permissions: [
    {
      id: '1066284097879670824', //vai
      level: 5,
    },
    {
      id: '530549578802659350', //syn
      level: 5,
    },
    {
      id: "1108411719434375240", //backy user
      level: 5,
    },
    {
      id: "1259460543157112832", //whitelist
      level: 2,
    },
    {
      id: '1047454193184682040', //handler
      level: 2
    },
    {
      id: '1109342180918702090', //whitelist 2
      level: 2
    },
    {
      id: '497918770187075595', //ian alt hehe
      level: 5
    },
    {
      id: '',
      level: 2
    },
    {
      id: '',
      level: 2
    },
    {
      id: '',
      level: 2
    },
  ],
  botlog: '901759430457167872',
  prefix: ';',
  filteredWords: [],
  AI: {
    filter: function(string) {
      string = string.replace('As an AI language model, ','')
      string = string.replace(' As an AI language model, ','')
      string = string.replace('an AI language model','gudetama')
      string = string.replace('OpenAI','Sloopies')
      return string;
    },
    chatAPI: 'https://api.openai.com/v1/chat/completions',
    imageAPI: 'https://api.openai.com/v1/images/generations',
    model: "gpt-3.5-turbo"//  
  },
  colors: colors,
  theme: colors.yellow,
  emojis: emojis,
};