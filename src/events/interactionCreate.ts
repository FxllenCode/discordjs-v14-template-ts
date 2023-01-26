import { GuildMember, Interaction } from "discord.js";
import { BotEvent } from "../types";
import logger from "../utils/winston";
import defaultEmbed from "../embeds/defaultEmbed";
import { checkPermissions } from "../utils/functions";

const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.slashCommands.get(interaction.commandName)
            if (interaction.client.user === null) return logger.error("The client's user is null! This should never happen!")
            if (command === undefined) return await interaction.reply({ embeds: [defaultEmbed("Error!", "This command does not exist!", interaction.client.user)], ephemeral: true }) && logger.warn(`${interaction.user.username} tried to use a slash command that does not exist! This should never happen.`)
            if (interaction.member instanceof GuildMember) {
                if (command.permissions) {
                    const neededPermissions = checkPermissions(interaction.member, command.permissions)
                    if (neededPermissions !== null)
                        return await interaction.reply({ embeds: [defaultEmbed("Error!", `You don't have enough permissions to use this command. Needed permissions: ${neededPermissions.join(", ")}`, interaction.client.user)], ephemeral: true })
                }
                
        
            } else {
                interaction.reply({ embeds: [defaultEmbed("Error!", "You can't use slash commands in DMs!", interaction.client.user)], ephemeral: true })
                logger.warn(`${interaction.user.username} tried to use a slash command in DMs! This should not have happend!`)
                return;
            }
            
            const cooldown = interaction.client.cooldowns.get(`${interaction.commandName}-${interaction.user.username}`)
            if (!command) return;
            if (command.cooldown && cooldown) {
                if (Date.now() < cooldown) {
                    interaction.reply({ embeds: [defaultEmbed("Slow down!", `You have to wait **${Math.floor(Math.abs(Date.now() - cooldown) / 1000)}** second(s) to use this command again.`, interaction.client.user)], ephemeral: true})
                    return
                }

                interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.username}`, Date.now() + command.cooldown * 1000)
                setTimeout(() => {
                    interaction.client.cooldowns.delete(`${interaction.commandName}-${interaction.user.username}`)
                }, command.cooldown * 1000)
            } else if (command.cooldown && !cooldown) {
                interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.username}`, Date.now() + command.cooldown * 1000)
            }
            command.execute(interaction)
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.slashCommands.get(interaction.commandName);
            if (!command) {
                logger.error(`Command ${interaction.commandName} not found!`)
                return;
            }
            try {
                if(!command.autocomplete) return;
                command.autocomplete(interaction);
            } catch (error) {
                logger.error(error)
            }
        }
    }
}

export default event;