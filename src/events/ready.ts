import { ActivityType, Client } from "discord.js";
import { BotEvent } from "../types";
import logger from "../utils/winston";
const event : BotEvent = {
    name: "ready",
    once: true,
    execute: (client : Client) => {
        logger.info(`Logged in as ${client.user?.tag}!`)
        client.user?.setActivity("for your commands! | /help", {type: ActivityType.Watching})
    }
}

export default event;