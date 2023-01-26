import { Client, GatewayIntentBits, Collection, PermissionFlagsBits,} from "discord.js";
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]})
import { SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import logger from "./utils/winston";
config()

client.slashCommands = new Collection<string, SlashCommand>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.TOKEN)
