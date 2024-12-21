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
  check: '<a:check:969936488739512340> ',
  x: '<a:Xmark:969401924736651284>',
  loading: '<a:loading2:976650648600854538>',
  warning: '<:S_warning:1108743925012902049>',
  online: '<:online_:1004014930959286342>',
  idle: '<:Idle_:1004014897417424938>',
  dnd: '<:dnd_:1004017480613773422>',
  offline: '<:offline_:1004015005282340916>',
  on: '<:on:1107664866484953178>',
  off: '<:off:1107664839372964010>',
}
module.exports = {
  config: {
    customMessages: [
      {
        id: '748461950605852723', //
        msg: 'Welkam chasoer',
      },
      {
        id: '772339611523350568', //
        msg: 'Bonjur chris',
      },
      {
        id: '1214504712829931550', //
        msg: 'Bonjor nard',
      },
      {
        id: '1202864381537554495', //
        msg: 'Belo pinzot',
      },
      {
        id: '1214564759219736598', //
        msg: 'Ho mikel',
      },
      {
        id: '563578598766805022', //
        msg: 'Welkam sir Mojica',
      },
      {
        id: '711514337205944371', //
        msg: 'Hola totoy na black',
      },
      {
        id: '1146368770084982847', //
        msg: 'Hai bea',
      },
      {
        id: '761368188419047434', //
        msg: 'Hi bby',
      },
      {
        id: '786805099908825088', //
        msg: 'Welkam classmeta',
      },
    ],
    backupVouches: [
      {
        original: '1138567779407114312', //pucca
        backup: 'https://discord.com/api/webhooks/1212757261819183147/xJznpS1MWL9_kn73SxHTbDorDYSd5cmXNNqQy85vP7izAEMzBFje5sxt7R_bSHto9i2C',
        condition: function(msg) { if (msg.attachments.size !== 0) return true }
      },
      {
        original: '1126087601774940170', //knifeluvz
        backup: 'https://discord.com/api/webhooks/1256236434260627460/vCL8KYTCdMtXvuR9fRpFms4TAqddncD9Bo6U4wFMeFbLSpEG-O3GMKykOj0AhLdvMwwb',
        condition: function(msg) { if (msg.attachments.size !== 0) return true }
      },
      {
        original: '1231186708922503200', //
        backup: 'https://discord.com/api/webhooks/1261708850872975513/5FQsHP4Ml_K3CkHCOmnAcXfwfFPhOtyRPQzBJgjCTXjBzzvjQzFY0COt0xdWMGlH1BVq',
        condition: function(msg) { return true }
      },
      {
        original: '1002181939928764516', //
        backup: 'https://discord.com/api/webhooks/1261280028776206346/gq_S1NjucdmqbnxHePpWnGOiYnS0ZIe7Attr8wlDEMjXwfDZkzKMpvjDTA1dIGUyZmNV',
        format: '1261359865365008435',
        condition: function(msg) { return true }
      },
      {
        original: '1245216125004943481', //
        backup: 'https://discord.com/api/webhooks/1261657812224839754/aAJ1ViPxDQGdIJ1PghIgRGpUIiqccmI56S2XQ9kbZxim-fuzLyyFdXitHOzHjoes12O-',
        format: '1261359865365008435',
        condition: function(msg) { return true }
      },
      {
        original: '1160528180839460965', //luvaye
        backup: 'https://discord.com/api/webhooks/1264439480958455810/BSU2xIGj0TurYqY-eE_Ro91d5RDXvrKX-Hk4zHmHaxy-wzELamyD44c59QPTBgMNakUj',
        format: '1261359865365008435',
        condition: function(msg) { return true }
      },
      {
        original: '1186378538237034497', //temporeg
        backup: 'https://discord.com/api/webhooks/1265324913250799656/QyguDuS_GuGplzVcyJIaqGrkhOFQ3GUPn5f0fcanFYA6cnG0qav3ljEPjk1FRLuycR1V',
        format: '1261359865365008435',
        condition: function(msg) { return true }
      },
      {
        original: '1148528793951154227', //angieie
        backup: 'https://discord.com/api/webhooks/1271030249123221524/ujfj0sYY1tLYmricVI9L49Z3VYTDVmkEUZTjlNLBqA0Xxp07-xGMvp98bX2cJvXyNfiV',
        format: '1261359865365008435',
        condition: function(msg) { return true }
      },
      {
        original: '1267977401162268752', //teri
        backup: 'https://discord.com/api/webhooks/1271034541670404126/6JE5yGXUTTnfpOJ1WZsL0viFCtP1SfdFFwOmidf3v5A5L_-jvMGlFvia2Om1ruicmkqj',
        format: '1261359865365008435',
        condition: function(msg) { return true }
      },
    ],
    version: '2',
    guildMaxtokens: 500,
    guildTokens: [
      { id: '1109020434449575936', maxTokens: 100000},
    ],
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