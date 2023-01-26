import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../types";
import logger from "../utils/winston";

module.exports = (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = []

    const slashCommandsDir = join(__dirname,"../commands")

    readdirSync(slashCommandsDir).forEach(file => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command : SlashCommand = require(`${slashCommandsDir}/${file}`).default
        slashCommands.push(command.command)
        client.slashCommands.set(command.command.name, command)
    })


    const rest = new REST({version: "10"}).setToken(process.env.TOKEN);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: slashCommands.map(command => command.toJSON())
    })
    .then((data : any) => {
        logger.info(`Successfully loaded ${data.length} slash command(s)!`)
    }).catch(e => {
        logger.error(e)
    })
}