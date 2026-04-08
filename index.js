const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const TOKEN = process.env.TOKEN;
const ROLE_ID = "1128692866567381025";

const JOIN_CHANNEL_ID = "1422509177481199669";
const LEAVE_CHANNEL_ID = "1491496841437773974";

client.on("clientReady", () => {
  console.log(`${client.user.tag} aktif!`);
});

// 👋 SUNUCUYA GİRİNCE
client.on("guildMemberAdd", async (member) => {

  const channel = member.guild.channels.cache.get(JOIN_CHANNEL_ID);

  // 🎉 giriş mesajı
  if (channel) {
    channel.send(`🎉 ${member.user} sunucuya katıldı!`);
  }

  // 🎭 rol verme
  const role = member.guild.roles.cache.get(ROLE_ID);

  if (role) {
    try {
      await member.roles.add(role);
      console.log("Rol verildi");
    } catch (err) {
      console.log("Rol verilemedi:", err.message);
    }
  }

});

// ❌ SUNUCUDAN ÇIKINCA
client.on("guildMemberRemove", (member) => {

  const channel = member.guild.channels.cache.get(LEAVE_CHANNEL_ID);

  if (channel) {
    channel.send(`❌ ${member.user.tag} sunucudan ayrıldı!`);
  }

});

client.login(TOKEN);
