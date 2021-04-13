const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('MUTE_MEMBERS')){
        return message.channel.send(new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setDescription('У вас недостаточно прав! / Usted no tiene derecho')
        );
    }
    
    let role= message.guild.roles.cache.find(r => r.name == 'Muted');
    if(!role) {
        message.guild.roles.create({ data: {name: 'Muted', permissions: 0, color: '777777'} })
        .then(r=> role = r).catch(err => {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription('Произошла ошибка при создание Muted-Роли, пожалуйста, создайте Muted-Роль / Paso un error en momento de crear un Muted-Role, por favor, crea Muted-Role')
            );
        });
    }

    let target = message.mentions.members.first();
    if(!target) {
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription('Вы не указали пользователя / No marcaste al usuario')
        );
    }

    target.roles.add(role).then(() => {
        message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setDescription(`Вы замутили ${target.user.tag} / Muteaste ${target.user.tag}`)
        )
    }) .catch(err => {
        message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setDescription(`Не удалось замутить пользователя!!! / No pudiste mutear a este usuario!!!`)
        )
    });
}