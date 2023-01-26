import { EmbedBuilder } from "@discordjs/builders";
import { APIEmbedField, ClientUser } from "discord.js";

const embed = (title : string, fields : Array<APIEmbedField>, user: ClientUser) => {
    return new EmbedBuilder()
    .setTitle(title)
    .setAuthor({
        name: user.username,
        iconURL: user.avatarURL()?.toString()
    })
    .setFields(fields)
    .setColor([28, 221, 128])
    .setTimestamp()
    .setFooter({
        text: `Powered by ${user.username}`,
        iconURL: user.avatarURL()?.toString()
    })
}
export default embed