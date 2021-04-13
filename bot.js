const { constants } = require('buffer');
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const fs = require('promise-fs');
client.login(process.ev.BOT_TOKEN)

bot.commands = new Discord.Collection();

loadCommands().then(loaded => {
    console.log(`loaded commands: ${loaded}`)
});

bot.on('message',(message)=>{
    const prefix = '!';
    let arr = message.content.split(' ');
    let args = arr.slice(1);
    let commandName = arr[0].slice(prefix.length);

    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;

    let file = bot.commands.get(commandName);
    if(file) file.run(bot, message, args);
});

bot.on ('ready', ()=>{
    console.log(`Ready! ${bot.user.tag}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{console.log(link);
    })
});

bot.login(config.token);

async function loadCommands(){
    let dir = await fs.readdir('commands', {encoding: 'utf8'});
    let files = dir.filter(file => file.endsWith('.js'));

    files.forEach(file => {
        let cmd = require(`./commands/${file}`);
        bot.commands.set(file.split('.')[0], cmd);
    });

    return files.length;
};
