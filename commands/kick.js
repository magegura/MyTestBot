const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription('У вас недостаточно прав! / Usted no tiene suficiente derechos')
        );
    }

    let target = message.mentions.members.first();
    if (!target) {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription('Укажите пользователя! / Marca al usuario!')
        );
    }

    if (!target.kickable) {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription('Этот пользователь не может быть забанен / Este usuario no se puede kickear')
        );
    }

    target.kick().then(() => {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setDescription(`Вы кикнули пользователя ${target.user.tag} ! / Kikeaste al usuario ${target.user.tag} !`)
        );
    })
        .catch(err => {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription('произошла ошибка / Paso algun error')
            );
        })

}