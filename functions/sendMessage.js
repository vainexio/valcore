const client = require('../server.js').client;
const Discord = require('discord.js');
const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = Discord;

module.exports = {
  safeSend: async function(channel, messageContent) {
    if (messageContent.length > 2000) {
      const buffer = Buffer.from(messageContent, 'utf-8');
      const attachment = new AttachmentBuilder(buffer, { name: 'codes.txt' });
      await channel.send({ files: [attachment] });
    } else {
      await channel.send(messageContent);
    }
  },
  sendChannel: async function (content, cc, color, limited, icon, row) {
    let log = client.channels.cache.get(cc) || client.channels.cache.find(channel => channel.name.includes(cc));
    let message = null;

    let embed = new EmbedBuilder()
      .setDescription(content)
      .setColor(color);

    if (icon && icon !== false) {
      embed.setThumbnail(icon);
    }
    if (row) {
      let newRow = new ActionRowBuilder();
      for (let i in row) {
        newRow.addComponents(row[i]);
      }
      await log.send({ embeds: [embed], components: [newRow] }).then((msg) => {
        message = msg;
      });
    } else {
      await log.send({ embeds: [embed] }).then((msg) => {
        message = msg;
      });
    }

    if (limited && limited === true) {
      setTimeout(function() { message.delete(); }, 20000);
    }
    return message;
  },
  sendUser: async function (content, user, color, limited, icon, row) {
    let log = await client.users.fetch(user).catch(console.error);
    let message = null;

    let embed = new EmbedBuilder()
      .setDescription(content)
      .setColor(color);

    if (icon) {
      embed.setThumbnail(icon);
    }

    if (row) {
      await log.send({ embeds: [embed], components: row }).then((msg) => {
        message = msg;
      });
    } else {
      await log.send({ embeds: [embed] }).then((msg) => {
        message = msg;
      });
    }

    if (limited && limited === true) {
      setTimeout(function() { message.delete(); }, 20000);
    }

    return message;
  },
};
