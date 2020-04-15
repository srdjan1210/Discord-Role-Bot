const Discord = require('discord.js');
const auth = require('./auth.json');
const bot = new Discord.Client();

var msg = 'React to this messages to get roles:\n \:flag_eu: : EUROPEAN UNION \n \:flag_us: : NORTH AMERICA';
var mainMsgObject = null;
var msg2 = new Discord.RichEmbed()
.addField("React to this message to get role:","\:flag_eu: : EUROPEAN UNION\n\:flag_us: : NORTH AMERICA");

bot.on('ready', () =>{
   var channel = bot.channels.get('699701868770754635');
   channel.send(msg2);
});

bot.on('message', (message) => {
   if(!mainMsgObject){
      mainMsgObject = message;
      message.react('🇪🇺');
      message.react('🇺🇸');
      
   }
});

bot.on('messageReactionAdd', async (msgreaction, user) => {
   if(user.bot){
      return;
   }
   let member = await msgreaction.message.guild.members.get(user.id);
   let role = null;
 
   if(msgreaction.emoji.name == "🇺🇸"){
      role = msgreaction.message.guild.roles.find(role => role.name === "NA");
   }else if(msgreaction.emoji.name == "🇪🇺"){
      role = msgreaction.message.guild.roles.find(role => role.name === "EU");
   }else{
      msgreaction.remove(user.id);
   }
   

   if(role != null){
       member.addRole(role);
   }

 });

 bot.on('messageReactionRemove', async (msgreaction, user) => {
   let member = msgreaction.message.guild.members.get(user.id);
   if(msgreaction.emoji.name == "🇪🇺"){
      let roleEU = member.guild.roles.find(role => role.name == "EU");
      member.removeRole(roleEU.id);
   }else if(msgreaction.emoji.name == "🇺🇸"){
      let roleEU = member.guild.roles.find(role => role.name == "NA");
      member.removeRole(roleEU.id);
   }
 });


 

bot.login(auth.token);
