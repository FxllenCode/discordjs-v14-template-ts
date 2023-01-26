
import { SlashCommandBuilder, } from "discord.js"
import { SlashCommand } from "../types";
import fieldsEmbed from "../embeds/fieldsEmbed";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot's ping"),
    execute: interaction => {
        const start = Date.now();
        interaction.reply({ content: "Pinging...", ephemeral: true }).then((int) => {
            const end = Date.now();
            interaction.editReply({
                content: "Here you go!",
                embeds: [
                    fieldsEmbed("Pong!", [            
                    { name: 'Bot Latency', value: `\`\`\`${end - start}ms\`\`\``, inline: true },
                    { name: 'API Latency', value: `\`\`\`${Math.round(interaction.client.ws.ping)}ms\`\`\``, inline: true },], interaction.client.user as any)
                ],
            })
        })

    },
    cooldown: 2
}

export default command