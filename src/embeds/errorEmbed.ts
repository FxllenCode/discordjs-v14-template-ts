import { EmbedBuilder } from "@discordjs/builders";
import { ClientUser } from "discord.js";

const embed = (title : string, description : string, user: ClientUser) => {
    return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setAuthor({
        name: user.username,
        iconURL: user.avatarURL()?.toString()
    })
    .setColor([28, 221, 128])
    .setTimestamp()
    .setFooter({
        text: `Powered by ${user.username}`,
        iconURL: user.avatarURL()?.toString()
    })
}
export default embed