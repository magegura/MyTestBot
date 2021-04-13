const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new MessageEmbed()
        .setColor(0xff0000)
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription(`
        Total canales: ${message.guild.channels.cache.size},
        Total de miembros: ${message.guild.presences.cache.size},
        Total bots: ${message.guild.members.cache.filter(m => m.bot).size},
        Nivel de moderador: ${message.guild.verificationLevel},
        Zona: ${message.guild.region}
        `);
    message.channel.send(embed);
}