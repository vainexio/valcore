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
  deleteSlashes: [],
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
      "name": "myservers",
      "type": 1,
      "description": "BACKUP - See all servers you are verified on and unverify from any of them",
      "options": [],
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
    /* ASSISTANT */
    {
      name: 'eligible',
      type: 1,
      description: 'ASSISTANT - Check group payout eligibility',
      options: [
        { name: 'username', type: 3, description: 'Roblox username', required: true },
        { name: 'group_id', type: 3, description: 'Roblox Group ID', required: true },
      ]
    },
    {
      name: 'register_group',
      type: 1,
      description: 'ASSISTANT - Register a Roblox group for a scanner whitelist',
      options: [
        {
          name: 'group',
          description: 'Roblox Group ID or Link',
          type: 3,
          required: true
        },
        {
          name: 'server_id',
          description: 'Discord Server ID',
          type: 3,
          required: true
        }
      ]
    },
    {
      name: 'unregister_group',
      type: 1,
      description: 'ASSISTANT - Unregister a Roblox group from a scanner whitelist',
      options: [
        {
          name: 'group_id',
          description: 'Roblox Group ID to remove',
          type: 3,
          required: true
        },
        {
          name: 'server_id',
          description: 'Discord Server ID',
          type: 3,
          required: true
        }
      ]
    },
    {
      "name": "giveperms",
      "type": 1,
      "description": "ASSISTANT - Allow a role to use bot commands for a specific user on a server",
      "options": [
        {
          "name": "role",
          "description": "Role to grant permission to",
          "type": 8,
          "required": true
        },
      ]
    },
    {
      "name": "removeperms",
      "type": 1,
      "description": "ASSISTANT - Deny a role from using bot commands for a specific user on a server",
      "options": [
        {
          "name": "role",
          "description": "Role to remove from the whitelist",
          "type": 8,
          "required": true
        },
      ]
    },
    {
      "name": "whitelist",
      "type": 1,
      "description": "ASSISTANT - Create or update a user whitelist/subscription",
      "options": [
        {
          "name": "user",
          "description": "Discord user to whitelist",
          "type": 6,
          "required": true
        },
        {
          "name": "type",
          "description": "Whitelist type",
          "type": 3,
          "choices": [
            {
              name: 'Gamepass Scanner',
              value: 'scanner'
            },
            {
              name: 'Backup Bot',
              value: 'backup'
            },
            {
              name: 'Nitro Checker',
              value: 'checker'
            },
          ],
          "required": true
        },
        {
          "name": "expiration_days",
          "description": "Expiration days",
          "type": 4,
          "required": true
        },
        {
          "name": "server_id",
          "description": "Server ID the whitelist applies to",
          "type": 3,
          "required": true
        },
      ]
    },
    {
      "name": "renew",
      "type": 1,
      "description": "ASSISTANT - Renew a user whitelist/subscription for more days (by user_id, server_id, type)",
      "options": [
        {
          "name": "user_id",
          "description": "User ID of the whitelist entry to renew",
          "type": 3,
          "required": true
        },
        {
          "name": "server_id",
          "description": "Server ID of the whitelist entry",
          "type": 3,
          "required": true
        },
        {
          "name": "days",
          "description": "Number of days to add",
          "type": 4,
          "required": true
        },
        {
          "name": "type",
          "description": "Whitelist type (must match the entry's type)",
          "type": 3,
          "required": true
        }
      ]
    },
    {
      "name": "remove",
      "type": 1,
      "description": "ASSISTANT - Remove a user whitelist/subscription by user_id and type",
      "options": [
        {
          "name": "user_id",
          "description": "User ID of the whitelist entry to remove",
          "type": 3,
          "required": true
        },
        {
          "name": "type",
          "description": "Whitelist type to remove (e.g. scanner, perms)",
          "type": 3,
          "required": true
        }
      ]
    },
    {
      "name": "getlink",
      "type": 1,
      "description": "ASSISTANT - Find gamepass link",
      "options": [
        {
          "name": 'username',
          "description": 'Roblox username',
          "type": 3,
          "required": true,
        },
        {
          "name": 'ct',
          "description": 'Covered rax price',
          "type": 10,
          "required": false,
        },
        {
          "name": 'nct',
          "description": 'Not covered tax price',
          "type": 10,
          "required": false,
        },
      ]
    },
  ],
};
