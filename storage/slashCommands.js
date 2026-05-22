/*
SUB_COMMAND - 1
SUB_COMMAND_GROUP - 2
STRING - 3
INTEGER - 4
BOOLEAN - 5
USER - 6
CHANNEL - 7
ROLE - 8
MENTIONABLE - 9
NUMBER - 10
ATTACHMENT - 11
*/

module.exports = {
  register: true,
  deleteSlashes: ['1040771266929496138','1234990429397717105','1392825039505592371','1169591423566368840','1170281459177771099','1234990408933707796'],
  slashes: [
    {
      "name": "help",
      "type": 1,
      "description": "BACKUP - Learn how to set up and use Valcore Backup",
      "options": [],
    },
    {
      "name": "restore_members",
      "type": 1,
      "description": "BACKUP - Instructions to restore your members on your new server",
      "options": [],
    },
    {
      "name": "status",
      "type": 1,
      "description": "BACKUP - Get your server's backup status",
      "options": [
        {
          "name": 'key',
          "description": 'Your access key (optional if you are the registered author)',
          "type": 3,
          "required": false,
        },
      ]
    },
    {
      "name": "getkey",
      "type": 1,
      "description": "BACKUP - Retrieve your server's access key via DM",
      "options": [],
    },
    {
      "name": "joinall",
      "type": 1,
      "description": "BACKUP - Join all your verified users to your backup server",
      "options": [
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": true,
        },
        {
          "name": 'target_server_id',
          "description": 'The server you want your verified users to join',
          "type": 3,
          "required": true,
        },
        {
          "name": 'message',
          "description": 'What to tell the members',
          "type": 3,
          "required": true,
        },
      ]
    },
    {
      "name": "join",
      "type": 1,
      "description": "BACKUP - Joins a verified user to a server",
      "options": [
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": true,
        },
        {
          "name": 'target_server_id',
          "description": 'The server you want the user to join',
          "type": 3,
          "required": true,
        },
        {
          "name": 'message',
          "description": 'What to tell the member',
          "type": 3,
          "required": true,
        },
        {
          "name": 'target_user',
          "description": 'User you want to join',
          "type": 6,
          "required": false,
        },
        {
          "name": 'target_user_id',
          "description": 'User ID you want to join',
          "type": 3,
          "required": false,
        },
      ],
    },
    {
      "name": "transfer",
      "type": 1,
      "description": "BACKUP - Transfer your data to a new server",
      "options": [
        {
          "name": 'new_server_id',
          "description": 'New server ID',
          "type": 3,
          "required": true,
        },
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": true,
        },
      ],
    },
    {
      "name": "verify_link",
      "type": 1,
      "description": "BACKUP - Get the verification link for your guild",
      "options": [],
    },
    {
      "name": "data",
      "type": 1,
      "description": "BACKUP - Get server data (admin only)",
      "options": [
        {
          "name": 'id',
          "description": 'Server/Author ID',
          "type": 3,
          "required": true,
        },
      ],
    },
    {
      "name": "setlimit",
      "type": 1,
      "description": "BACKUP - Update max tokens limit (admin only)",
      "options": [
        {
          "name": 'id',
          "description": 'Server/Author ID',
          "type": 3,
          "required": true,
        },
        {
          "name": 'limit',
          "description": 'New max tokens limit',
          "type": 10,
          "required": true,
        },
      ],
    },
    {
      "name": "register",
      "type": 1,
      "description": "BACKUP - Register your server",
      "options": [
        {
          "name": 'guild_id',
          "description": 'Your server ID',
          "type": 3,
          "required": true,
        },
      ],
    },
    {
      "name": "unregister",
      "type": 1,
      "description": "BACKUP - Unregister your server",
      "options": [
        {
          "name": 'key',
          "description": 'Access Key',
          "type": 3,
          "required": true,
        },
      ],
    },
    {
      "name": "setrole",
      "type": 1,
      "description": "BACKUP - Set the verified role for your server",
      "options": [
        {
          "name": 'role',
          "description": 'The role to assign to verified users',
          "type": 8,
          "required": true,
        },
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": true,
        },
      ],
    },
    {
      "name": "unverify_on_leave",
      "type": 1,
      "description": "BACKUP - Toggle whether users are unverified when they leave the server",
      "options": [
        {
          "name": 'enabled',
          "description": 'Enable or disable unverify on leave',
          "type": 5,
          "required": true,
        },
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": true,
        },
      ],
    },
  ],
};
