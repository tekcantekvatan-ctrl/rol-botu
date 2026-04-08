const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const TOKEN = process.env.TOKEN;
const ROLE_ID = "1491485420100521994";

client.on("clientReady", () => {
  console.log(`${client.user.tag} aktif!`);
});

client.on("guildMemberAdd", async (member) => {
  const role = member.guild.roles.cache.get(ROLE_ID);
  if (role) {
    await member.roles.add(role);
    console.log("Rol verildi");
  }
});

client.login(TOKEN);
