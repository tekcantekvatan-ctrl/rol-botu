const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const TOKEN = process.env.TOKEN;
const ROLE_ID = "1128692866567381025";
const CHANNEL_ID = "1422509177481199669"; // 👈 bunu ekle

client.on("clientReady", () => {
  console.log(`${client.user.tag} aktif!`);
});

client.on("guildMemberAdd", async (member) => {

  // 🎉 HOŞ GELDİN MESAJI
  const channel = member.guild.channels.cache.get(CHANNEL_ID);
  if (channel) {
    channel.send(`🎉 ${member.user} sunucuya katıldı!`);
  }

  // 🎭 ROL VERME
  const role = member.guild.roles.cache.get(ROLE_ID);
  if (role) {
    await member.roles.add(role);
    console.log("Rol verildi");
  }

});

client.login(TOKEN);
