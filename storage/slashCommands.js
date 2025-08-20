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
  register: false,
  deleteSlashes: ['1040771266929496138','1234990429397717105','1392825039505592371','1169591423566368840','1170281459177771099','1234990408933707796'],
  slashes: [
    {
      "name": "restore_members",
      "type": 1,
      "description": "BACKUP - Instructions to restore your members on your new server",
      "options": [],
    },
    {
      "name": "status",
      "type": 1,
      "description": "BACKUP - Get server status",
      "options": [
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": true,
        },
      ]
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
      "description": "BACKUP - Transfer your data",
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
      "description": "BACKUP - Get verification link of a guild",
      "options": [],
    },
    {
      "name": "data",
      "type": 1,
      "description": "BACKUP - Get server data",
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
      "description": "BACKUP - Update max tokens limit",
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
  ],
};
