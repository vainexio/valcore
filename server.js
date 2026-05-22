// Project
require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const cc = 'KJ0UUFNHWBJSE-WE4GFT-W4VG'
const fs = require('fs-extra')
const moment = require('moment')

// Discord
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { WebhookClient, Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, PermissionFlagsBits, ChannelType, ActivityType, ButtonStyle } = Discord;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});

// Env
const token = process.env.SECRET;
const mongooseToken = process.env.MONGOOSE;

async function startApp() {
    let promise = client.login(token)
    if (cc !== process.env.CC) {
        console.error("Discord bot login | Invalid Token 2");
        process.exit(1);
    }
    promise.catch(function (error) {
        console.error("Discord bot login | " + error);
        process.exit(1);
    });
}
startApp();

let guildSchema
let guildModel

let tokenSchema
let tokenModel

let whitelist

// put this near the top of your file
const guildCommandLocks = new Map();

async function withGuildLock(guildId, fn) {
    if (guildCommandLocks.get(guildId)) return false; // already running

    guildCommandLocks.set(guildId, true);
    try {
        await fn();
    } finally {
        guildCommandLocks.delete(guildId);
    }

    return true;
}

client.on("debug", function (info) {
  console.log(info);
});

client.on("ready", async () => {
    console.log('Successfully logged in to discord bot.')
    await mongoose.connect(mongooseToken, { keepAlive: true });
    guildSchema = new mongoose.Schema({
        id: String,
        key: String,
        author: String,
        maxTokens: Number,
        verifiedRole: String,
        unverifyOnLeave: Boolean,
        users: [],
    })
    tokenSchema = new mongoose.Schema({
        id: String,
        access_token: String,
        refresh_token: String,
        createdAt: String,
        expiresAt: String,
    })
    const whitelistSchema = new mongoose.Schema({
        userId: { type: String, required: true },
        type: { type: String, required: true },
        serverId: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        roleIds: { type: [String], default: [] }
    });

    whitelist = mongoose.model('Whitelist', whitelistSchema);
    guildModel = mongoose.model("ValcoreBackup_Model", guildSchema);
    tokenModel = mongoose.model("ValcoreBackup_Token", tokenSchema);

    if (slashCmd.register) {
        const { REST, Routes } = require('discord.js');
        const rest = new REST({ version: '10' }).setToken(token);
        try {
            console.log(`Registering ${slashes.length} slash command(s)...`);
            const result = await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: slashes }
            );
            console.log(`Successfully registered ${result.length} slash command(s).`);
        } catch (err) {
            console.error('Failed to register slash commands:', err);
        }
    }
    client.user.setPresence({ status: 'online', activities: [{ name: 'Users', type: ActivityType.Listening }] });
    //await giveWhitelist()
    if (!process.env.CC || cc !== process.env.CC) process.exit(1);
})

async function giveWhitelist() {
    const guilds = await guildModel.find().lean();
    console.log(`giveWhitelist started — ${guilds.length} guild(s) — ${new Date().toISOString()}`);

    let success = 0;
    let failed = 0;

    for (const guild of guilds) {
        if (!guild) continue;

        console.log(`Processing guild ${guild.id} (author: ${guild.author})`);

        try {
            const res = await whitelist.findOneAndUpdate(
                { serverId: guild.id, userId: guild.author, type: "backup" },
                {
                    $set: { expiresAt: moment().add(274, 'days').toDate() },
                    $setOnInsert: { roleIds: [], serverId: guild.id, userId: guild.author, type: "backup" }
                },
                { upsert: true, new: true } // kept your original options
            );

            // res is the updated or newly created document (because of new: true)
            const id = res && res._id ? res._id.toString() : 'unknown';
            console.log(`  ✔ upsert succeeded for guild ${guild.id} — doc _id=${id}`);
            success++;
        } catch (err) {
            console.error(`  ✖ upsert FAILED for guild ${guild.id} —`, err && err.message ? err.message : err);
            failed++;
        }
    }

    console.log(`giveWhitelist finished — ${new Date().toISOString()}`);
    console.log(`Summary: total=${guilds.length}, success=${success}, failed=${failed}`);

    return { total: guilds.length, success, failed };
}

module.exports = {
    client: client,
    getPerms,
    noPerms,
};

let listener = app.listen(process.env.PORT, function () {
    console.log('Not that it matters but your app is listening on port ' + listener.address().port);
});
/*
░██████╗███████╗████████╗████████╗██╗███╗░░██╗░██████╗░░██████╗
██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗░██║██╔════╝░██╔════╝
╚█████╗░█████╗░░░░░██║░░░░░░██║░░░██║██╔██╗██║██║░░██╗░╚█████╗░
░╚═══██╗██╔══╝░░░░░██║░░░░░░██║░░░██║██║╚████║██║░░╚██╗░╚═══██╗
██████╔╝███████╗░░░██║░░░░░░██║░░░██║██║░╚███║╚██████╔╝██████╔╝
╚═════╝░╚══════╝░░░╚═╝░░░░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚═════╝░╚═════╝░*/
var output = "901759430457167872";
const settings = require('./storage/settings_.js')
const { config, auth, prefix, colors, status, theme, commands, permissions, emojis } = settings
// Slash Commands
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
    let sortedPerms = await permissions.sort((a, b) => b.level - a.level)
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
    let Embed = new EmbedBuilder()
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
const { safeSend, sendChannel, sendUser } = sendMsg
//Functions
const get = require('./functions/get.js')
const { getTime, chatAI, getNth, getChannel, getGuild, getUser, getMember, getRandom, getColor } = get
//Command Handler
const cmdHandler = require('./functions/commands.js')
const { checkCommand, isCommand, isMessage, getTemplate } = cmdHandler
//Others
const others = require('./functions/others.js')
const { makeCode, stringJSON, fetchKey, ghostPing, sleep, moderate, getPercentage, getPercentageEmoji, randomTable, scanString, requireArgs, getArgs, makeButton, makeRow } = others
//Roles Handler
const roles = require('./functions/roles.js')
const { getRole, addRole, removeRole, hasRole } = roles
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

async function refreshOneToken(user) {
    const now = getTime(new Date());
    if (now < user.expiresAt) return { success: true, refreshed: false, access_token: user.access_token };

    const params = new URLSearchParams();
    params.append('client_id', client.user.id);
    params.append('client_secret', process.env.clientSecret);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', user.refresh_token);

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
        let response = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: params,
            headers: headers
        });

        if (response.status === 200) {
            const result = await response.json();

            user.access_token = result.access_token;
            user.refresh_token = result.refresh_token;
            user.createdAt = now;
            user.expiresAt = getTime(new Date().getTime() + (result.expires_in * 1000));

            await user.save();

            return {
                success: true,
                refreshed: true,
                access_token: result.access_token
            };
        } else if (response.status === 400) {
            await tokenModel.deleteOne({ id: user.id });
            return { success: false, error: "Invalid refresh token", deleted: true };
        } else {
            return { success: false, error: `${response.status} - ${response.statusText}` };
        }
    } catch (err) {
        console.error("Single token refresh error:", err);
        return { success: false, error: err.toString() };
    }
}

client.on("messageCreate", async (message) => {
    if (message.content.toLowerCase() === ';inv') {
        let row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setURL('https://discord.com/api/oauth2/authorize?client_id=' + client.user.id + '&permissions=8&scope=bot').setStyle(ButtonStyle.Link).setLabel("Invite Bot"),
        );

        message.reply({ components: [row] })
    }
    if (message.channel.type === ChannelType.DM || message.author.bot) return;
    //
    if (!await guildPerms(message.member, [PermissionFlagsBits.ManageGuild]) && !/^\W/.test(message.content) && !message.content.toLowerCase().startsWith('owo')) {
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
    if (isCommand('restore', message)) {
    const ok = await withGuildLock(message.guild.id, async () => {
        await message.reply(emojis.loading+" Restoring verified members...");
        let members = await message.guild.members.fetch().then(async mems => {
            let members = [];
            mems.forEach(mem => members.push(mem));
            
            let success = 0;
            let failed = 0;
            let doc = await guildModel.findOne({ id: message.guild.id });

            if (!doc) {
                console.log('No guild document found');
                return;
            }

            for (let i in members) {
                let mem = members[i];
                try {
                    let found = doc.users.find(u => u === mem.user.id);
                    let isVerified = await hasRole(mem, [doc.verifiedRole]);

                    if (!found && !mem.user.bot && isVerified) {
                        doc.users.push(mem.user.id);
                        success++;
                    } else {
                        failed++;
                    }
                } catch (err) {
                    failed++;
                    console.log(err);
                }
            }

            let toDelete = [];
            for (let i in doc.users) {
                let user = doc.users[i];
                if (user === null) toDelete.push(i);
            }

            toDelete.sort((a, b) => b - a);
            for (let i in toDelete) {
                let index = toDelete[i];
                doc.users.splice(index, 1);
            }

            await doc.save();
            message.reply('SUCCESS: ' + success+'\nOTHER: ' + failed);
        });
    });

    if (!ok) {
        return message.reply("Command is already running in this server.");
    }
}
    else if (isCommand('calibrate', message)) {
        if (!await getPerms(message.member, 4)) return message.reply({ content: emojis.warning + " You can't do that sir" });
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
                let userData = await tokenModel.findOne({ id: user })
                if (!userData) {
                    toDelete.push(i)
                    if (server) {
                        try {
                            let member = await getMember(user, message.guild)
                            if (member) await removeRole(member, ['backup', guild.verifiedRole])
                        } catch (err) {
                            error++
                        }
                    }
                }
                else safe++
            }

            let embed = new EmbedBuilder()
                .addFields(
                    { name: server ? server.name : 'Unknown', value: 'Changes\n' + guild.users.length + ' >> ' + (guild.users.length - toDelete.length) }
                )

            toDelete.sort((a, b) => b - a);
            for (let i in toDelete) {
                let index = toDelete[i]
                guild.users.splice(index, 1)
            }
            embed
                .addFields(
                    { name: 'Total Registered Users', value: guild.users.length.toString() },
                    { name: 'Error', value: error.toString() }
                )
                .setFooter({ text: guild.id })
                .setColor(colors.none)

            message.channel.send({ content: '<@' + guild.author + '>', embeds: [embed] })
            //guild.verifiedRole = "Backup"
            await guild.save();
        }
    }
    else if (isCommand('fixrole', message)) {
        let members = await message.guild.members.fetch().then(async mems => {
            let members = []
            mems.forEach(mem => members.push(mem))
            await message.react('🔃')

            let doc = await guildModel.findOne({ id: message.guild.id })
            let data = {
                total: 0,
                calibrated: 0,
                failed: 0,
            }
            for (let i in members) {
                let mem = members[i]
                if (await hasRole(mem, [doc.verifiedRole])) {
                    data.total++
                    try {
                        if (!doc.users.find(u => u == mem.id)) {
                            await removeRole(mem, [doc.verifiedRole])
                            data.calibrated++
                        }
                        //
                    } catch (err) {
                        data.failed++
                        console.log(err)
                    }
                }
            }

            await message.reply("Total users checked: " + data.total + "\nCalibrated: " + data.calibrated + "\nFailed: " + data.failed)
        })
    }
    else if (isCommand('check', message)) {
        if (!await getPerms(message.member, 4)) return message.reply({ content: emojis.warning + " You can't do that sir" });
        let guilds = await guildModel.find()
        let list = []
        let topTen = ""
        let count = 0
        for (let i in guilds) {
            count++
            let guild = guilds[i]
            list.push({ id: guild.id, users: guild.users.length, author: guild.author })
        }
        let content = ''
        for (let i in list) {
            let data = list[i]
            let guild = await getGuild(data.id)
            let counter = 0
            if (guild) {
                counter++
                let author = await getMember(data.author, message.guild)
                let emoji = ''
                if (author) {
                    emoji = '📄'
                    await addRole(author, ['1259460543157112832'], message.guild)
                }
                else emoji = '❌'

                content += counter + '. ' + emoji + ' <@' + data.author + '>\n'
            }
        }
        await safeSend(message.channel, content + '\n\n📄 = in server\n✅ = has @comms role\n❌ = neither')
    }
});/*END MESSAGE CREATE*/
let joinDebounce = false
client.on('interactionCreate', async inter => {
    if (inter.isCommand()) {
        let cname = inter.commandName
        //
        // Setup
        if (cname === 'register') {
            try {
                if (!await getPerms(inter.member, 2)) {
                    return inter.reply({
                        embeds: [new EmbedBuilder()
                            .setColor(colors.red)
                            .setTitle(`${emojis.warning} Access Denied`)
                            .setDescription("You are not on the whitelist. Purchase access to use Valcore Backup.")],
                        ephemeral: true
                    });
                }

                await inter.deferReply({ ephemeral: true });

                const options = inter.options.data;
                const guildIdOpt = options.find(a => a.name === 'guild_id');

                if (!guildIdOpt?.value || !/^\d{17,20}$/.test(guildIdOpt.value)) {
                    return inter.editReply({ content: emojis.warning + ' Please provide a valid server ID (17–20 digit number).' });
                }

                const guild = await getGuild(guildIdOpt.value);
                if (!guild) {
                    return inter.editReply({ content: emojis.warning + ' Server not found. Make sure **Valcore** is already added to that server.' });
                }

                const memberInGuild = await getMember(inter.user.id, guild);
                if (!memberInGuild) {
                    return inter.editReply({ content: emojis.warning + ' You must be a member of the server you want to register.' });
                }
                if (!await guildPerms(memberInGuild, [PermissionFlagsBits.ManageGuild])) {
                    return inter.editReply({ content: emojis.warning + ' You need the **Manage Server** permission in **' + guild.name + '** to register it.' });
                }

                const existing = await guildModel.findOne({ id: guild.id });
                if (existing) {
                    return inter.editReply({ content: emojis.warning + ' **' + guild.name + '** is already registered. Use `/status` to view its info.' });
                }

                const docAuthor = await guildModel.findOne({ author: inter.user.id });
                if (docAuthor && inter.user.id !== '497918770187075595') {
                    return inter.editReply({ content: emojis.warning + ' You already have a registered server. Each user may only register **1 server**.' });
                }

                const newDoc     = new guildModel(guildSchema);
                newDoc.id        = guild.id;
                newDoc.key       = makeCode(30);
                newDoc.author    = inter.user.id;
                newDoc.maxTokens = config.guildMaxtokens;
                newDoc.verifiedRole = "Backup";
                await newDoc.save();

                const keyEmbed = new EmbedBuilder()
                    .setColor(theme)
                    .setTitle(`${emojis.check} Server Registered`)
                    .setDescription("Your access key is below. **Store it somewhere safe — you will need it to use Valcore commands.**")
                    .addFields(
                        { name: "Server", value: guild.name + " (`" + guild.id + "`)" },
                        { name: "Max Members", value: String(config.guildMaxtokens) },
                        { name: "Next Steps", value: "• Use `/setrole` to set your verified role\n• Use `/verify_link` to get a verification link\n• Use `/status` to view your server info" }
                    )
                    .setFooter({ text: "Do not share your key with anyone." });

                await inter.user.send({ content: "```\n" + newDoc.key + "\n```", embeds: [keyEmbed] })
                    .then(() => inter.editReply({
                        embeds: [new EmbedBuilder()
                            .setColor(colors.green)
                            .setTitle(`${emojis.on} Registration Successful`)
                            .setDescription("**" + guild.name + "** has been registered.\n\n" + emojis.check + " Your access key was sent to your **DMs**. Save it externally!")
                            .setThumbnail(guild.iconURL())]
                    }))
                    .catch(async err => {
                        console.log('register DM error:', err);
                        await guildModel.deleteOne({ key: newDoc.key });
                        inter.editReply({ content: emojis.warning + " Registration cancelled — couldn't send you a DM. Please allow DMs from server members and try again." });
                    });
            } catch (err) {
                console.error('/register error:', err);
                const msg = inter.deferred ? inter.editReply : inter.reply;
                msg.call(inter, { content: emojis.warning + ' An unexpected error occurred. Please try again.' }).catch(() => {});
            }
        }
        else if (cname === 'unregister') {
            try {
                const options = inter.options.data;
                const key = options.find(a => a.name === 'key');
                await inter.deferReply({ ephemeral: true });

                const doc = await guildModel.findOne({ key: key.value });
                if (!doc) return inter.editReply({ content: emojis.warning + ' Invalid access key. Double-check your key and try again.' });

                const guild = await getGuild(doc.id);
                const embed = new EmbedBuilder()
                    .setColor(colors.red)
                    .setTitle(`${emojis.warning} Confirm Unregister`)
                    .setDescription("This will **permanently delete** all backup data for this server.\nThis action **cannot** be undone.")
                    .addFields(
                        { name: "Server", value: guild ? guild.name + " (`" + guild.id + "`)" : "`" + doc.id + "`" },
                        { name: "Verified Members Stored", value: doc.users.length.toString(), inline: true },
                        { name: "Registered By", value: '<@' + doc.author + '>', inline: true },
                    )
                    .setFooter({ text: "Press Unregister below to confirm." });

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId('unregisPrompt-' + inter.user.id).setStyle(ButtonStyle.Danger).setLabel("Unregister"),
                );
                await inter.editReply({ content: doc.id, embeds: [embed], components: [row], ephemeral: true });
            } catch (err) {
                console.error('/unregister error:', err);
                const reply = inter.deferred ? inter.editReply : inter.reply;
                reply.call(inter, { content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }

        // Config
        else if (cname === 'unverify_on_leave') {
            try {
                const options = inter.options.data;
                const key     = options.find(a => a.name === 'key');
                const enabled = options.find(a => a.name === 'enabled');
                await inter.deferReply({ ephemeral: true });

                const doc = await guildModel.findOne({ key: key.value });
                if (!doc) return inter.editReply({ content: emojis.warning + ' Invalid access key.' });

                doc.unverifyOnLeave = enabled.value;
                await doc.save();

                const embed = new EmbedBuilder()
                    .setColor(doc.unverifyOnLeave ? colors.green : colors.red)
                    .setDescription(
                        doc.unverifyOnLeave
                            ? emojis.on + " **Unverify on Leave** is now **enabled**.\nMembers will be removed from your verified list when they leave the server."
                            : emojis.off + " **Unverify on Leave** is now **disabled**.\nMembers will stay in your verified list even after leaving."
                    );
                await inter.editReply({ embeds: [embed] });
            } catch (err) {
                console.error('/unverify_on_leave error:', err);
                const reply = inter.deferred ? inter.editReply : inter.reply;
                reply.call(inter, { content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }
        else if (cname === 'status') {
            try {
                const options = inter.options.data;
                const key = options.find(a => a.name === 'key');
                await inter.deferReply({ ephemeral: true });

                let doc = key?.value ? await guildModel.findOne({ key: key.value }) : null;
                if (!doc) doc = await guildModel.findOne({ author: inter.user.id });
                if (!doc) {
                    return inter.editReply({
                        content: emojis.warning + " No registered server found for your account. Provide your access key or use `/register` to get started."
                    });
                }

                const guild = await getGuild(doc.id);
                const usedPct = Math.round((doc.users.length / doc.maxTokens) * 100);

                const embed = new EmbedBuilder()
                    .setColor(colors.none)
                    .setTitle(guild?.name || 'Unknown Server')
                    .setThumbnail(guild?.iconURL() || null)
                    .setDescription("Use `/restore_members` for instructions on moving your members to a new server.")
                    .addFields(
                        {
                            name: "Verified Members",
                            value:
                                "**" + doc.users.length + " / " + doc.maxTokens + "** (" + usedPct + "%)\n" +
                                (doc.verifiedRole !== "Backup"
                                    ? emojis.on + " Role: <@&" + doc.verifiedRole + ">"
                                    : emojis.warning + " No role set — use `/setrole`") + "\n" +
                                (doc.unverifyOnLeave ? emojis.on + " Unverify on Leave: **On**" : emojis.off + " Unverify on Leave: **Off**"),
                            inline: false
                        },
                        { name: "Registered By", value: "<@" + doc.author + ">", inline: true },
                        { name: "Server ID", value: "`" + doc.id + "`", inline: true },
                        { name: "Access Key", value: "```\n" + doc.key + "\n```" }
                    )
                    .setFooter({ text: "Keep your access key private — do not share it with anyone." });

                await inter.editReply({ embeds: [embed] });
            } catch (err) {
                console.error('/status error:', err);
                const reply = inter.deferred ? inter.editReply : inter.reply;
                reply.call(inter, { content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }
        else if (cname === 'setrole') {
            try {
                const options = inter.options.data;
                const role = options.find(a => a.name === 'role');
                const key  = options.find(a => a.name === 'key');
                await inter.deferReply({ ephemeral: true });

                if (!role?.role?.id) return inter.editReply({ content: emojis.warning + ' Please select a valid role.' });

                const doc = await guildModel.findOne({ key: key.value });
                if (!doc) return inter.editReply({ content: emojis.warning + ' Invalid access key.' });

                const oldRole = doc.verifiedRole;
                doc.verifiedRole = role.role.id;
                await doc.save();

                const embed = new EmbedBuilder()
                    .setColor(theme)
                    .setTitle(`${emojis.on} Verified Role Updated`)
                    .addFields(
                        { name: "Previous Role", value: oldRole !== "Backup" ? "<@&" + oldRole + ">" : "`" + oldRole + "` (default)", inline: true },
                        { name: "New Role", value: role.role.toString(), inline: true },
                    )
                    .setDescription("Members who verify will now receive " + role.role.toString() + ".\nMake sure Valcore's bot role is **above** this role in Server Settings → Roles.");

                await inter.editReply({ embeds: [embed] });
            } catch (err) {
                console.error('/setrole error:', err);
                const reply = inter.deferred ? inter.editReply : inter.reply;
                reply.call(inter, { content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }

        // Backup
        else if (cname === 'restore_members') {
            try {
                await inter.deferReply({ ephemeral: true });

                const embed = new EmbedBuilder()
                    .setColor(theme)
                    .setTitle("🔄 How to Restore Members to a New Server")
                    .setDescription("Follow these steps **in order** to move your verified members to a new server. Make sure Valcore is added to **both** servers before starting.")
                    .addFields(
                        {
                            name: "Step 1 — Register your new server",
                            value: "Run `/register` with your **new server's ID**.\nThis creates a fresh backup entry for the new server.",
                        },
                        {
                            name: "Step 2 — Transfer your data",
                            value: "Run `/transfer` using your **current access key** and the **new server ID**.\nThis moves all your verified members and generates a new key.",
                        },
                        {
                            name: "Step 3 — Run Join All",
                            value: "Run `/joinall` with your **new access key** and **new server ID** as the target.\nThis pulls all verified members into the new server.",
                        },
                        {
                            name: "Step 4 — Restore Roles (optional)",
                            value: "Run `/addroles` to re-assign the verified role to members already in the new server.\nUseful if some members joined before you ran `/joinall`.",
                        },
                        {
                            name: "⚠️ Important Notes",
                            value:
                                "• Members must have their **Discord DMs open** to receive the join invitation.\n" +
                                "• Members whose tokens have expired will be **automatically cleaned up**.\n" +
                                "• Save your new key from Step 2 — use `/status` to view it anytime.",
                        }
                    )
                    .setFooter({ text: "Need help? Contact the server admin or use /help." });

                await inter.editReply({ embeds: [embed] });
            } catch (err) {
                console.error('/restore_members error:', err);
                const reply = inter.deferred ? inter.editReply : inter.reply;
                reply.call(inter, { content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }
        else if (cname === 'transfer') {
            try {
                const options    = inter.options.data;
                const newServer  = options.find(a => a.name === 'new_server_id');
                const key        = options.find(a => a.name === 'key');
                await inter.deferReply({ ephemeral: true });

                if (!newServer?.value || !/^\d{17,20}$/.test(newServer.value)) {
                    return inter.editReply({ content: emojis.warning + ' Please provide a valid new server ID.' });
                }

                const doc = await guildModel.findOne({ key: key.value });
                if (!doc) return inter.editReply({ content: emojis.warning + ' Invalid access key.' });

                const whitelisted = await whitelist.findOne({ serverId: doc.id, type: "backup" });
                if (!whitelisted) return inter.editReply({ content: emojis.warning + ' Your current server is not whitelisted. Contact support.' });

                const guild = await getGuild(newServer.value);
                if (!guild) return inter.editReply({ content: emojis.warning + ' New server not found. Make sure Valcore is added to it first.' });

                const existingGuild = await guildModel.findOne({ id: guild.id });
                if (existingGuild && existingGuild.id !== doc.id) {
                    return inter.editReply({ content: emojis.warning + ' **' + guild.name + '** is already registered under a different account.' });
                }

                const oldGuildId  = doc.id;
                const oldAuthorId = doc.author;

                doc.id     = guild.id;
                doc.author = inter.user.id;
                doc.key    = makeCode(30);

                whitelisted.serverId = guild.id;
                whitelisted.userId   = inter.user.id;
                await whitelisted.save();
                await doc.save();

                const embed = new EmbedBuilder()
                    .setColor(colors.blue)
                    .setTitle(`${emojis.check} Data Transferred Successfully`)
                    .addFields(
                        { name: "Previous Server", value: "`" + oldGuildId + "`", inline: true },
                        { name: "New Server", value: guild.name + " (`" + guild.id + "`)", inline: true },
                        { name: "\u200b", value: "\u200b" },
                        { name: "Previous Author", value: "<@" + oldAuthorId + ">", inline: true },
                        { name: "New Author", value: inter.user.toString(), inline: true },
                        { name: "Verified Members", value: doc.users.length.toString() + " members carried over", inline: false },
                    )
                    .setDescription("A **new access key** has been generated and sent to your DMs. Your old key is now invalid.")
                    .setFooter({ text: "Save your new key — you will need it for all future commands." });

                await inter.channel.send({ embeds: [embed] });

                const keyEmbed = new EmbedBuilder()
                    .setColor(theme)
                    .setTitle("New Access Key Generated")
                    .setDescription("Your old key has been replaced. **Store this somewhere safe.**")
                    .addFields({ name: "New Server", value: guild.name + " (`" + guild.id + "`)" });

                await inter.user.send({ content: "```\n" + doc.key + "\n```", embeds: [keyEmbed] })
                    .then(() => inter.editReply({ content: emojis.check + ' Transfer complete. Your new key was sent to your DMs.' }))
                    .catch(async err => {
                        console.log('transfer DM error:', err);
                        inter.editReply({ content: emojis.warning + ' Transfer complete but DMs are closed.\n```\n' + doc.key + '\n```\nSave this now!', embeds: [keyEmbed] });
                    });
            } catch (err) {
                console.error('/transfer error:', err);
                const reply = inter.deferred ? inter.editReply : inter.reply;
                reply.call(inter, { content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }

        else if (cname === 'getkey') {
            try {
                await inter.deferReply({ ephemeral: true });

                const docs = await guildModel.find({ author: inter.user.id });
                if (!docs || docs.length === 0) {
                    return inter.editReply({
                        content: emojis.warning + " No registered server found under your account. Use `/register` to register your server first.",
                    });
                }

                const keyEmbed = new EmbedBuilder()
                    .setColor(theme)
                    .setTitle(`${emojis.on} Your Access Keys`)
                    .setDescription("Your access keys have been sent to your **DMs**.")
                    .setFooter({ text: "Do not share your keys with anyone." });

                const dmEmbed = new EmbedBuilder()
                    .setColor(theme)
                    .setTitle("Your Valcore Backup Keys")
                    .setDescription("You requested your access keys. If you did not request this, please contact the Valcore admin.")
                    .setFooter({ text: "Keep these private. Do not share them with anyone." });

                const fields = docs.map((doc, index) => {
                    const guild = getGuild(doc.id); // keep async outside if getGuild returns promise
                    return {
                        name: `Server ${index + 1}`,
                        value: [
                            `**Server:** ${guild ? guild.name + " (`" + guild.id + "`)" : "`" + doc.id + "`"}`,
                            `**Access Key:**`,
                            "```",
                            doc.key,
                            "```",
                        ].join("\n"),
                    };
                });

                // If getGuild is async, resolve names first:
                const enrichedFields = [];
                for (const doc of docs) {
                    const guild = await getGuild(doc.id);
                    enrichedFields.push({
                        name: guild ? `${guild.name}` : `Server \`${doc.id}\``,
                        value: `**Access Key:**\n\`\`\`\n${doc.key}\n\`\`\``,
                    });
                }

                dmEmbed.addFields(enrichedFields);

                await inter.user.send({ embeds: [dmEmbed] })
                    .then(() => inter.editReply({ embeds: [keyEmbed] }))
                    .catch(err => {
                        console.log('getkey DM error:', err);
                        inter.editReply({ content: emojis.warning + " Couldn't send a DM. Please enable DMs from server members and try again." });
                    });
            } catch (err) {
                console.error('/getkey error:', err);
                const reply = inter.deferred ? inter.editReply : inter.reply;
                reply.call(inter, { content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }

        else if (cname === 'help') {
            try {
                const embed = new EmbedBuilder()
                    .setColor(theme)
                    .setTitle("📖 Valcore Backup — Setup Guide")
                    .setDescription("Follow these steps to set up Valcore Backup on your server. All commands should be run in a channel where the bot is visible.")
                    .addFields(
                        {
                            name: "Step 1 — Add Valcore to your server",
                            value: "Open <@968378766260846713>'s profile and click **Add to Server**. Make sure to grant it **Administrator** permissions.",
                        },
                        {
                            name: "Step 2 — Register your server",
                            value: "Run `/register` and enter your **Server ID** (right-click your server → Copy Server ID).\nYou will receive your access key via DM. **Save it!**",
                        },
                        {
                            name: "Step 3 — Set your verified role",
                            value: "Run `/setrole` with your chosen role.\n⚠️ Make sure Valcore's role is **above** your verified role in Server Settings → Roles, or it won't be able to assign it.",
                        },
                        {
                            name: "Step 4 — Get your verification link",
                            value: "Run `/verify_link` in the channel you want to post the link in.\nMembers click **Verify** and authenticate with Discord. They'll be added to your backup automatically.",
                        },
                        {
                            name: "Step 5 — Check your backup",
                            value: "Run `/status` at any time to see how many members are backed up and review your settings.",
                        },
                        {
                            name: "🔁 Restoring Members",
                            value: "If your server gets nuked or deleted, use `/restore_members` for full step-by-step recovery instructions.",
                        },
                        {
                            name: "🔑 Lost Your Key?",
                            value: "Use `/getkey` and your key will be sent to your DMs.",
                        },
                        {
                            name: "📋 Tips",
                            value:
                                "• Store your key in a notepad, password manager, or DM yourself.\n" +
                                "• Use `/unverify_on_leave` to auto-clean members who leave.\n" +
                                "• Use `/status` to view your key at any time.",
                        }
                    )
                    .setFooter({ text: "Valcore Backup — for any issues, contact the administrator." });

                await inter.reply({ embeds: [embed], ephemeral: true });
            } catch (err) {
                console.error('/help error:', err);
                inter.reply({ content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }

        else if (cname === 'joinall') {
            //
            const whitelisted = await whitelist.findOne({ serverId: inter.guild.id, type: "backup" });
            if (!whitelisted) {
                return inter.reply({
                    embeds: [new EmbedBuilder()
                        .setColor(colors.red)
                        .setTitle(`${emojis.warning} Server Not Whitelisted`)
                        .setDescription("This server is not whitelisted. Run this command from your **registered main server**, or use `/transfer` if you no longer have access to it.")],
                    ephemeral: true
                });
            }

            const options = inter.options.data;
            const key     = options.find(a => a.name === 'key');
            const reason  = options.find(a => a.name === 'message');
            const guildId = options.find(a => a.name === 'target_server_id');

            if (!guildId?.value || !/^\d{17,20}$/.test(guildId.value)) {
                return inter.reply({ content: emojis.warning + ' Please provide a valid target server ID.', ephemeral: true });
            }

            const guild = await getGuild(guildId.value);
            if (!guild) return inter.reply({ content: emojis.warning + ' Target server not found. Make sure Valcore is added to it.', ephemeral: true });

            const doc = await guildModel.findOne({ key: key.value });
            if (!doc) return inter.reply({ content: emojis.warning + ' Invalid access key.', ephemeral: true });
            if (doc.users.length === 0) return inter.reply({ content: emojis.warning + ' No verified members found in your backup. Members need to verify first.', ephemeral: true });

            if (joinDebounce) return inter.reply(emojis.warning + " Bot is currently busy with other `joinall` commands. Please try again later.");
            joinDebounce = true;

            let failed = 0;
            let success = 0;
            let already = 0;
            let errors = "";
            let toDelete = [];

            await inter.reply({ content: emojis.loading + " Joining " + doc.users.length + " users to your new guild **(" + guild.name + ")**", ephemeral: true });
            const usersDataContent = `['${doc.users.join("', '")}'];`;
            await safeSend(inter.channel, "**Initial Report Data**\n\n" + usersDataContent);

            let ch = await getChannel(config.channels.templates);
            let foundMsg = await ch.messages.fetch('1261206750422503434');
            let msgContent = '' + foundMsg.content;

            for (let i in doc.users) {
                let userId = doc.users[i];
                try {
                    let user = await getUser(userId);
                    if (user) {
                        let member = await getMember(user.id, guild);
                        if (member) {
                            already++;
                        } else {
                            let data = await tokenModel.findOne({ id: userId });
                            if (data) {
                                let result = await refreshOneToken(data);
                                if (!result.success) {
                                    toDelete.push(i);
                                    failed++;
                                    errors += `Token refresh failed for ${userId}: ${result.error || 'unknown reason'}\n\n`;
                                    continue;
                                }

                                const tokenToUse = result.access_token;
                                await guild.members.add(user, { accessToken: tokenToUse })
                                    .then(suc => {
                                        success++;

                                        let unverify = new ActionRowBuilder().addComponents(
                                            new ButtonBuilder().setCustomId('unverifPrompt-' + doc.id).setStyle(ButtonStyle.Secondary).setLabel('Unverify'),
                                        );

                                        let finalMsg = msgContent.replace('{server}', guild.name).replace('{user}', '<@' + doc.author + '>').replace('{msg}', reason.value);

                                        user.send({
                                            content: finalMsg,
                                            components: [unverify]
                                        });
                                    })
                                    .catch(err => {
                                        if (err.toString().includes('Invalid OAuth2') || err.toString().includes('Unknown User')) {
                                            toDelete.push(i);
                                            failed++;
                                        } else {
                                            errors += `Fetch failed: ${userId}\n${err}\n\n`;
                                        }
                                    });
                            } else {
                                toDelete.push(i);
                                errors += 'No token data found for ' + userId + "\n\n";
                                failed++;
                            }
                        }
                    } else {
                        toDelete.push(i);
                        await tokenModel.deleteOne({ id: userId });
                        errors += 'User not found ' + userId + "\n\n";
                        failed++;
                    }
                } catch (err) {
                    errors += 'Code error on ' + userId + ': ' + err + "\n\n";
                }
            }

            fs.writeFileSync('errors-data.txt', errors, 'utf8');
            toDelete.sort((a, b) => b - a);
            for (let i in toDelete) {
                let index = toDelete[i];
                doc.users.splice(index, 1);
            }
            joinDebounce = false;
            await doc.save();

            const reportEmbed = new EmbedBuilder()
                .setColor(failed === 0 ? colors.green : success > 0 ? colors.orange : colors.red)
                .setTitle(`${emojis.check} Join All — Complete`)
                .setDescription("Members have been processed for **" + guild.name + "**.")
                .addFields(
                    { name: emojis.check + " Joined",            value: String(success), inline: true },
                    { name: emojis.on  + " Already in Server",   value: String(already), inline: true },
                    { name: emojis.x  + " Deauthorized/Failed",  value: String(failed),  inline: true },
                    { name: "🔑 Remaining Tokens",               value: String(doc.users.length), inline: true },
                )
                .setFooter({ text: failed > 0 ? "Deauthorized entries were cleaned from your backup automatically." : "All members processed successfully." });

            await inter.channel.send({ embeds: [reportEmbed] });
            if (errors.trim().length > 0) await safeSend(inter.channel, "**Error Log**\n```\n" + errors.slice(0, 1900) + "\n```");
        }
        else if (cname === 'join') {
            //
            const whitelisted = await whitelist.findOne({ serverId: inter.guild.id, type: "backup" });
            if (!whitelisted) {
                return inter.reply({
                    embeds: [new EmbedBuilder()
                        .setColor(colors.red)
                        .setTitle(`${emojis.warning} Server Not Whitelisted`)
                        .setDescription("This server is not whitelisted. Run this command from your **registered main server**, or use `/transfer` if you no longer have access to it.")],
                    ephemeral: true
                });
            }
            //
            let options = inter.options.data;
            let key = options.find(a => a.name === 'key');
            let reason = options.find(a => a.name === 'message');
            let user = options.find(a => a.name === 'target_user');
            let userId = options.find(a => a.name === 'target_user_id');
            let guildId = options.find(a => a.name === 'target_server_id');

            !user ? userId ? user = await getUser(userId.value) : user = null : user = user.user;
            if (!user) return inter.reply({ content: emojis.warning + ' Invalid user ID', ephemeral: true });

            try {
                let guild = await getGuild(guildId.value);
                let doc = await guildModel.findOne({ key: key.value });

                if (!doc) return inter.reply({ content: emojis.warning + ' Invalid access key' });
                if (!guild) return inter.reply({ content: emojis.warning + ' Invalid guild ID', ephemeral: true });

                let existingUser = doc.users.find(u => u === user.id);
                if (!existingUser) return await inter.reply({ content: emojis.x + ' **' + user.tag + '** is not verified on ' + guild.name, ephemeral: true });

                await inter.reply({ content: emojis.loading + ' Joining **' + user.tag + '** to ' + guild.name, ephemeral: true });
                let data = await tokenModel.findOne({ id: user.id });
                let error = false;

                let ch = await getChannel(config.channels.templates);
                let foundMsg = await ch.messages.fetch('1261206750422503434');
                let msgContent = '' + foundMsg.content;

                // Refresh token if needed
                let result = await refreshOneToken(data);
                if (!result.success) {
                    return inter.followUp({ content: emojis.warning + " Failed to refresh token for **" + user.tag + "**\n\n\```diff\n- result.error```" });
                }

                let tokenToUse = result.access_token;

                await guild.members.add(user, { accessToken: tokenToUse }).catch(err => {
                    console.log(err);
                    error = true;
                    inter.followUp({ content: emojis.warning + " Failed to join **" + user.tag + "** to " + guild.name + '\n```diff\n-' + err + '```' });
                }).then(msg => {
                    if (!error) {
                        inter.followUp({ content: emojis.on + " Successfully joined **" + user.tag + "** to " + guild.name });

                        let unverify = new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('unverifPrompt-' + doc.id).setStyle(ButtonStyle.Secondary).setLabel('Unverify'),
                        );

                        msgContent = msgContent.replace('{server}', guild.name);
                        msgContent = msgContent.replace('{user}', '<@' + doc.author + '>');
                        msgContent = msgContent.replace('{msg}', reason.value);

                        user.send({
                            content: msgContent,
                            components: [unverify]
                        });
                    }
                });
            } catch (err) {
                console.log(err);
                inter.channel.send({ content: emojis.warning + " Unexpected error occurred\n```diff\n- " + err + "```" });
            }
        }

        // Misc
        else if (cname === 'addroles') {
            try {
                const whitelisted = await whitelist.findOne({ serverId: inter.guild.id, type: "backup" });
                if (!whitelisted) {
                    return inter.reply({
                        embeds: [new EmbedBuilder()
                            .setColor(colors.red)
                            .setTitle(`${emojis.warning} Server Not Whitelisted`)
                            .setDescription("This server is not whitelisted. Run this command from your **registered main server**, or use `/transfer` if you no longer have access to it.")],
                        ephemeral: true
                    });
                }

                const options = inter.options.data;
                const key     = options.find(a => a.name === 'key');

                const doc = await guildModel.findOne({ key: key.value });
                if (!doc) return inter.reply({ content: emojis.warning + ' Invalid access key.', ephemeral: true });
                if (doc.users.length === 0) return inter.reply({ content: emojis.warning + ' No verified members in your backup yet.', ephemeral: true });

                const role = await getRole(doc.verifiedRole, inter.guild);
                if (!role) return inter.reply({ content: emojis.warning + ' No verified role is set. Use `/setrole` first.', ephemeral: true });

                await inter.reply({ content: emojis.loading + " Assigning the verified role to " + doc.users.length + " members...", ephemeral: true });

                let failed = 0, success = 0, already = 0;
                for (let i in doc.users) {
                    const userId = doc.users[i];
                    try {
                        const user = await getUser(userId);
                        if (user) {
                            const member = await getMember(user.id, inter.guild);
                            if (member) {
                                if (await hasRole(member, [role.id])) already++;
                                else {
                                    const notAdded = await addRole(member, [role.id], inter.guild);
                                    notAdded ? failed++ : success++;
                                }
                            } else { failed++; }
                        }
                    } catch (err) {
                        await tokenModel.deleteOne({ id: userId });
                        console.log('addroles error:', err);
                        failed++;
                    }
                }

                await inter.channel.send({
                    embeds: [new EmbedBuilder()
                        .setColor(failed === 0 ? colors.green : colors.orange)
                        .setTitle(`${emojis.check} Add Roles — Complete`)
                        .addFields(
                            { name: emojis.check + " Role Assigned", value: String(success), inline: true },
                            { name: emojis.on  + " Already Had Role", value: String(already), inline: true },
                            { name: emojis.x  + " Failed",           value: String(failed),  inline: true },
                        )]
                });
            } catch (err) {
                console.error('/addroles error:', err);
                inter.reply({ content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }
        else if (cname === 'verify_link') {
            try {
                const doc = await guildModel.findOne({ id: inter.guild.id });
                if (!doc) return inter.reply({ content: emojis.warning + ' This server is not registered. Use `/register` first.', ephemeral: true });
                const guild = await getGuild(doc.id);

                const url = encodeURI('https://discord.com/oauth2/authorize?client_id=' + client.user.id + '&response_type=code&redirect_uri=' + process.env.live + '&scope=guilds.join+identify&state=' + doc.id + '-version' + config.version);
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setURL(url).setStyle(ButtonStyle.Link).setLabel("Verify"),
                );

                const embed = new EmbedBuilder()
                    .setColor(colors.none)
                    .setTitle(guild?.name || 'Unknown Server')
                    .setThumbnail(guild?.iconURL() || null)
                    .setDescription("Share this embed in your server. Members click **Verify** to authorize and be added to your backup.")
                    .addFields(
                        { name: "Verified Members", value: doc.users.length + " / " + doc.maxTokens, inline: true },
                        { name: "Verified Role", value: doc.verifiedRole !== "Backup" ? "<@&" + doc.verifiedRole + ">" : "Not set — use `/setrole`", inline: true },
                        { name: "Unverify on Leave", value: doc.unverifyOnLeave ? "Enabled" : "Disabled", inline: true },
                    )
                    .setFooter({ text: "Members click Verify to authenticate with Discord." });

                await inter.reply({ embeds: [embed], components: [row] });
            } catch (err) {
                console.error('/verify_link error:', err);
                inter.reply({ content: emojis.warning + ' An unexpected error occurred.' }).catch(() => {});
            }
        }
        else if (cname === 'merge') {
            if (!await getPerms(inter.member, 5)) return inter.reply({ content: emojis.warning + " Insufficient Permission" });
            let options = inter.options.data
            //
            let newServer = options.find(a => a.name === 'new_server_id')
            let key = options.find(a => a.name === 'key')
            let doc = await guildModel.findOne({ key: key.value })

            await inter.reply({ content: emojis.loading + ' Merging data. Please wait.', ephemeral: true })

            let guild = newServer ? await getGuild(newServer.value) : inter.guild
            if (!doc || !guild) return inter.channel.send({ content: emojis.warning + ' Invalid guild/key' })
            let existingGuild = await guildModel.findOne({ id: guild.id })
            for (let i in doc.users) {
                let user = doc.users[i]
                if (!existingGuild.users.find(u => u == user)) {
                    existingGuild.users.push(user)
                }
            }
            await existingGuild.save()
            console.log('yipi')
        }
        else if (cname === 'data') {
            if (!await getPerms(inter.member, 5)) return inter.reply({ content: emojis.warning + " Insufficient Permission" });
            let options = inter.options.data
            //
            let id = options.find(a => a.name === 'id')
            let doc = await guildModel.findOne({ id: id.value })

            if (!doc) doc = await guildModel.findOne({ author: id.value })
            if (!doc) return inter.reply({ content: emojis.warning + ' Invalid guild/author data' })
            inter.reply({ content: doc.key, ephemeral: true })
        }
        else if (cname === 'setlimit') {
            if (!await getPerms(inter.member, 5)) return inter.reply({ content: emojis.warning + " Insufficient Permission" });
            let options = inter.options.data
            //
            let id = options.find(a => a.name === 'id')
            let limit = options.find(a => a.name === 'limit')
            let doc = await guildModel.findOne({ id: id.value })

            if (!doc) doc = await guildModel.findOne({ author: id.value })
            if (!doc) return inter.reply({ content: emojis.warning + ' Invalid guild/author data' })

            let oldLimit = doc.maxTokens
            doc.maxTokens = limit.value
            await doc.save()
            inter.reply({ content: emojis.on + " Successfully changed max tokens from **" + oldLimit + "** to **" + limit.value + "**" })
        }
    }
    //BUTTONS
    else if (inter.isButton() || inter.isStringSelectMenu()) {
        let id = inter.customId
        if (id.startsWith("unverifPrompt-")) {
            let guildId = id.replace('unverifPrompt-', '')
            let row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('unverify-' + guildId).setStyle(ButtonStyle.Success).setLabel("Yes"),
                new ButtonBuilder().setCustomId('cancel').setStyle(ButtonStyle.Danger).setLabel("No"),
            );
            await inter.reply({ content: 'Are you sure you want to unverify yourself from this server?', ephemeral: true, components: [row] })
        }
        else if (id.startsWith("unregisPrompt-")) {
            let userId = id.replace('unregisPrompt-', '')
            let row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('unregister-' + inter.message.content).setStyle(ButtonStyle.Success).setLabel("Yes"),
                new ButtonBuilder().setCustomId('cancel').setStyle(ButtonStyle.Danger).setLabel("No"),
            );
            await inter.reply({ content: 'Are you sure you want to unregister this server?\n> This action is irreversible!', ephemeral: true, components: [row] })
        }
        //
        else if (id.startsWith('unregister-')) {
            let guildId = id.replace('unregister-', '')
            let userId = inter.user.id
            let doc = await guildModel.findOne({ id: guildId })
            let guild = await getGuild(doc.id)
            if (!doc) return inter.update({ content: emojis.warning + ' Unergistered guild ID', components: [] })

            let embed = new EmbedBuilder()
                .setDescription(emojis.off + ' This guild data was terminated by ' + inter.user.toString())
                .setColor(colors.red)
                .addFields(
                    { name: "Guild", value: "Guild ID `" + guild?.id + "`\nGuild Name `" + guild?.name + "`" },
                    { name: "Registered Users", value: doc.users.length.toString(), inline: true },
                    { name: "Author", value: '<@' + doc.author + '>', inline: true },
                    { name: "Access Key", value: '```diff\n- ' + doc.key.substr(0, doc.key.length - 20) + '```' },
                )
            await guildModel.deleteOne({ id: guildId })
            await inter.reply({ embeds: [embed] })
        }
        else if (id.startsWith('unverify-')) {
            let guildId = id.replace('unverify-', '')
            let userId = inter.user.id
            let guild = await getGuild(guildId)
            let doc = await guildModel.findOne({ id: guildId })
            if (!doc) return inter.update({ content: emojis.warning + ' Unergistered guild ID', components: [] })
            let user = doc.users.find(u => u === userId)
            if (!user) return inter.update({ content: emojis.warning + ' You are not verified on this server', components: [] })
            await inter.update({ content: emojis.check + ' You have been **unverified** from this server!\nClick the button again if you wish to reverify', components: [] })
            doc.users.splice(doc.users.indexOf(userId), 1)
            await doc.save();
            await sleep(1000)
            let member = await getMember(inter.user.id, guild)
            await removeRole(member, [doc.verifiedRole, "sloopie"], guildId)
        }
        else if (id.startsWith('cancel')) {
            await inter.update({ content: 'Interaction was cancelled.', components: [] })
        }
    }
});
client.on('guildMemberRemove', async member => {
    let doc = await guildModel.findOne({ id: member.guild.id })
    if (doc && doc.unverifyOnLeave) {
        console.log(`👋 ${member.user.username} left the server ${member.guild.name}`);
        let user = doc.users.find(u => u === member.user.id)
        if (user) {
            doc.users.splice(doc.users.indexOf(member.user.id), 1);
            await doc.save();
        }
    }
});
process.on('unhandledRejection', async error => {
    console.log(error);
    let caller_line = error.stack.split("\n");
    let index = await caller_line.find(b => b.includes('/app'))
    let embed = new EmbedBuilder()
        .addFields(
            { name: 'Caller Line', value: '```' + (index ? index : 'Unknown') + '```', inline: true },
            { name: 'Error Code', value: '```css\n[ ' + error.code + ' ]```', inline: true },
            { name: 'Error', value: '```diff\n- ' + (error.stack >= 1024 ? error.stack.slice(0, 1023) : error.stack) + '```' }
        )
        .setColor(colors.red)

    let channel = await getChannel(output)
    channel ? channel.send({ embeds: [embed] }).catch(error => error) : null
});

function respond(res, data) {
    const htmlTemplate = fs.readFileSync('public/new-output.html', 'utf8');

    const modifiedHtml = htmlTemplate
        .replace(/\$\{pageTitle\}/g, (data.guild?.name ? data.guild.name.toUpperCase() : 'VALCORE').replace(/^(.{20}).+/, "$1..."))
        .replace(/\$\{imageUrl\}/g, data.guild && data.guild.iconURL() ? data.guild.iconURL() : "https://upload.wikimedia.org/wikipedia/commons/3/37/Sad-face.png")
        .replace(/\$\{bannerUrl\}/g, data.guild && data.guild.bannerURL() ? data.guild.bannerURL({ size: 1024, forceStatic: false }) : "")
        .replace(/\$\{subtext\}/g, data.text.toUpperCase())
        .replace(/\$\{subtextColor\}/g, data.color)
        .replace(/\$\{subtext2\}/g, data.text2 ? data.text2 : '');

    res.send(modifiedHtml);
}

function buildJsonResponse(data) {
    return {
        title: (data.guild?.name ? data.guild.name.toUpperCase() : 'VALCORE').replace(/^(.{20}).+/, "$1..."),
        imageUrl: data.guild && data.guild.iconURL() ? data.guild.iconURL() : "https://upload.wikimedia.org/wikipedia/commons/3/37/Sad-face.png",
        bannerUrl: data.guild && data.guild.bannerURL() ? data.guild.bannerURL({ size: 1024, forceStatic: false }) : "",
        text: data.text.toUpperCase(),
        color: data.color,
        text2: data.text2 ? data.text2 : '',
    };
}
// Immediately serve loading page — the actual verification is done via /backup/verify (called by JS in the page)
app.get('/backup', function (req, res) {
    try {
        const loadingTemplate = fs.readFileSync('public/loading.html', 'utf8');
        const page = loadingTemplate
            .replace('${CODE}',  req.query.code  || '')
            .replace('${STATE}', req.query.state || '');
        res.send(page);
    } catch (err) {
        console.error('Failed to serve loading page:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Verification logic — returns JSON so the loading page can update itself
app.get('/backup/verify', async function (req, res) {
    const sendResult = (data) => res.json(buildJsonResponse(data));

    if (!req.query.state) return sendResult({ text: "Unknown server ID", color: '#ff4b4b' });
    if (!req.query.state.includes('-version' + config.version)) return sendResult({ text: "Link version mismatch — please get a fresh link", color: '#ff4b4b' });
    if (!req.query.code) return sendResult({ text: "Missing authorization code", color: '#ff4b4b' });

    const foundGuildId = req.query.state.replace('-version' + config.version, '');

    try {
        const guild = await getGuild(foundGuildId);

        const whitelisted = await whitelist.findOne({ serverId: foundGuildId, type: "backup" });
        if (!whitelisted) return sendResult({ text: "Server not whitelisted", color: '#ff4b4b', guild: guild });

        const data_1 = new URLSearchParams();
        data_1.append('client_id', client.user.id);
        data_1.append('client_secret', process.env.clientSecret);
        data_1.append('grant_type', 'authorization_code');
        data_1.append('redirect_uri', process.env.live);
        data_1.append('scope', 'identify');
        data_1.append('code', req.query.code);

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`Client IP: ${ip.split(',')[0].trim()}`);

        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

        let tokenResponse = await fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1, headers: headers });
        tokenResponse = await tokenResponse.json();

        if (!tokenResponse.access_token) return sendResult({ text: "Link expired — please get a fresh link", color: '#ff4b4b', guild: guild });

        let userResponse = await fetch('https://discord.com/api/users/@me', { headers: { 'authorization': `Bearer ${tokenResponse.access_token}` } });
        if (userResponse.status !== 200) console.log(`User fetch: ${userResponse.status} ${userResponse.statusText}`);
        const user = await userResponse.json();

        console.log(`Verifying: ${user?.username} (${user?.id})`);

        if (!user || user?.message?.includes('401')) return sendResult({ text: "Link expired — please get a fresh link", color: '#ff4b4b', guild: guild });
        if (!user.id) return sendResult({ text: "Critical error — please report to the developer", color: '#ff4b4b', guild: guild });

        if (!guildModel) return sendResult({ text: "Valcore is starting up — please try again in a moment", color: '#ff8800', guild: guild });

        const doc = await guildModel.findOne({ id: foundGuildId });
        if (!doc) return sendResult({ text: "Unregistered guild", color: '#ff4b4b', guild: guild });

        let userData = await tokenModel.findOne({ id: user.id });
        const member = await getMember(user.id, guild);
        if (!member) return sendResult({ text: "You are not in this server", color: '#ff8800', guild: guild });

        // Save / update OAuth token
        if (userData) {
            userData.access_token  = tokenResponse.access_token;
            userData.refresh_token = tokenResponse.refresh_token;
            userData.createdAt     = getTime(new Date());
            userData.expiresAt     = getTime(new Date().getTime() + (tokenResponse.expires_in * 1000));
            await userData.save();
        } else {
            const newUser        = new tokenModel(tokenSchema);
            newUser.id           = user.id;
            newUser.access_token  = tokenResponse.access_token;
            newUser.refresh_token = tokenResponse.refresh_token;
            newUser.createdAt    = getTime(new Date());
            newUser.expiresAt    = getTime(new Date().getTime() + (tokenResponse.expires_in * 1000));
            await newUser.save();
        }

        if (await hasRole(member, ['restricted'], guild)) return sendResult({ text: "Verification restricted — contact a server admin", color: '#ff4b4b', guild: guild });
        if (doc.users.length >= doc.maxTokens) return sendResult({ text: "Server has reached its member limit (" + doc.users.length + "/" + doc.maxTokens + ")", color: '#ff4b4b', guild: guild });

        const foundUser = doc.users.find(u => u === user.id);
        const customMsg = config.customMessages.find(c => c.id === user.id);

        if (foundUser) {
            const notAdded = member ? await addRole(member, [doc.verifiedRole, "sloopie"], guild) : null;
            if (notAdded) console.log('Role not added:', notAdded);
            return sendResult({ text: customMsg ? customMsg.msg : "Already verified", text2: doc.users.length + "/" + doc.maxTokens + " members", color: '#ff8800', guild: guild });
        }

        doc.users.push(user.id);
        await doc.save();
        await addRole(member, [doc.verifiedRole, "sloopie"], guild);

        if (guild.id === '1109020434449575936') {
            const logChannel = await getChannel('1109020436026634265');
            const template    = await getChannel('1109020434810294344');
            const logMsg      = await template.messages.fetch('1258073676792856597');
            logChannel.send({ content: logMsg.content.replace('{user}', '<@' + member.id + '>') });
        }

        const userIndex = doc.users.indexOf(user.id) + 1;
        sendResult({ text: customMsg ? customMsg.msg : "Verified successfully", text2: "You are the <b>" + getNth(userIndex) + "</b> verified member", color: '#b6ff84', guild: guild });

        // Send welcome DM to the newly verified user
        try {
            const ch       = await getChannel(config.channels.templates);
            let dmTemplate = (await ch.messages.fetch('1261206731313385494')).content;
            dmTemplate     = dmTemplate.replace('{server}', guild.name).replace('{user}', '<@' + doc.author + '>');

            const unverifyRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('unverifPrompt-' + doc.id).setStyle(ButtonStyle.Secondary).setLabel('Unverify'),
            );
            await member.user.send({ content: dmTemplate, components: [unverifyRow] });
        } catch (dmErr) {
            console.log('Could not send welcome DM:', dmErr.message || dmErr);
        }
    } catch (err) {
        console.error('/backup/verify error:', err);
        res.status(500).json({ text: "Internal server error — please try again", color: '#ff4b4b' });
    }
});

app.get('/', async function (req, res) {
    res.status(200).send({ status: "VALCORE is up and running!!" })
});
