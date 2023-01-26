import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction } from "discord.js"
import mongoose from "mongoose"
import { type } from "os"

export interface SlashCommand {
    command: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    permissions?: Array<PermissionResolvable>,
    cooldown?: number // in seconds
}



export interface IGuild extends mongoose.Document {
    guildID: string,
    joinedAt: Date
}

export type GuildOption = keyof GuildOptions
export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}

export type LogLevels = "emerg" | "alert" | "crit" | "error" | "warning" | "notice" | "info" | "debug"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            CLIENT_ID: string,
            MONGO_URI: string,
            MONGO_DATABASE_NAME: string
            LOG_LEVEL: LogLevels,
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        cooldowns: Collection<string, number>
    }
}kw