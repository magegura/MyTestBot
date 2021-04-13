const Discord = require('discord.js');

module.exports.run = async (bot, message, args) =>{
    if(!message.member.hasPermission('BAN_MEMBERS')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription('У вас недостаточно прав! / Usted no tiene suficiente derechos')
        );
    }

    let target = message.mentions.members.first();
    if(!target) {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription('Укажите пользователя! / Marca al usuario!')
        );
    }

    if(!target.bannable){
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription('Этот пользователь не может быть забанен / Este usuario no se puede bloquear')
        );
    }

    target.ban().then(()=>{
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setDescription(`Пользователь ${target.user.tag} забанен! / Usuario ${target.user.tag} esta bloqueado!`)
        );
    })
    .catch(err =>{
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription('произошла ошибка / Paso algun error')
        );
    })

}