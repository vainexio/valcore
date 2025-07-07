const fetch = require('node-fetch');

const client = require('../server.js').client;
const Discord = require('discord.js');
const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = Discord;

const settings = require('../storage/settings_.js')
const colors = settings.colors

const {AI, shop, notices, auth, prefix, status, theme, commands, permissions, emojis, timeout, rateLimit, assets, townhallData, leagueData} = settings
const open_ai = process.env.OPEN_AI

module.exports = {
  getTime: function(stamp) {
    return Math.floor(new Date(stamp).getTime()/1000.0);
  },
  chatAI: async function(content,type) {
    let data = {}
    let chosenAPI = null
    if (content.toLowerCase().includes('show me') || type === 'image') {
      chosenAPI = AI.imageAPI
      data = {
        "prompt": content,
        "n": 1,
        "size": "1024x1024"
      }
    } else {
      chosenAPI = AI.chatAPI
      data = {
        "model": AI.model,//,
        "messages": [{"role": "user", "content": content}]
      }
    }
    let auth = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+open_ai,//'Bearer ,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      }
    
    let response = await fetch(chosenAPI,auth)
    response = await response.json()
    return {response, chosenAPI: chosenAPI};
  },
  getNth: function (value) {
    value = value.toString()

    let end = value[value.length-1]
    let mid = value[value.length-2]
    let nth = mid !== '1' ? end === '1' ? 'st' : end === '2' ? 'nd' : end === '3' ? 'rd' : 'th' : 'th'
    
    return value+nth
  },
  getChannel: async function (id) {
  id = id ? id.replace(/<|#|>/g,'') : 0
  let channel = !isNaN(id) ? await client.channels.fetch(id) : null
  return channel;
},
  //Get Guild
  getGuild: async function (id) {
  let guild = await client.guilds.fetch(id).catch(error => console.log('Unknown Guild: '+id))
  return guild;
},
  //Get Users
  getUser: async function (id) {
  id = id ? id.replace(/<|@|>/g,'') : 0
  let user = !isNaN(id) ? await client.users.fetch(id).catch(error => console.log('Unknown User: '+id)) : null
  return user;
},
  //Get members
  getMember: async function (id, guild) {
  try {
    id = id ? id.replace(/<|@|>/g, '') : '0';
    if (isNaN(id)) return null;
    const user = await guild.members.fetch(id);
    return user;
  } catch (err) {
    return null;
  }
  },
  //Get random
  getRandom: function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
},
  //Get color
  getColor: async function getColor(string) {
  let color = colors[string.toLowerCase()]
  if (color) return color;
},
};