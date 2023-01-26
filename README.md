<h1 style="text-align:center;">Discord.js v14 Bot Template</h1>

This is my own personal fork that is still WIP! Based on https://github.com/MericcaN41/discordjs-v14-template-ts!
## Features

* 🟦 Typescript
* 🔥 Slash commands (supports auto complete!)
* 🕛 Cooldowns
* 🏴 Detailed Permissions
* 💪 Event & Command handlers
* 🍃 MongoDB Support
* 🧹 Eslint integration
* 🪵 Winston logging


## Installation

Clone the repository then create a file named `.env` and fill it out accordingly

```js
TOKEN=YOURTOKENHERE
CLIENT_ID=BOTS CLIENT ID
MONGO_URI=YOUR MONGO CONNECTION STRING
MONGO_DATABASE_NAME=YOUR DATABASE NAME
LOG_LEVEL=LOGGINGLEVEL
```

Then, install all dependencies using `npm i`. 

For development, use the `npm run dev` command. To start the bot, run `npm run start`! This will purge the `build` folder, build the code using `tsc`, then run it!

## Features in Progress

* `/help` command!
