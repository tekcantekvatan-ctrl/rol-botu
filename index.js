const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ── Slash komutlarını yükle ──────────────────────────────────────────────────
client.commands = new Collection();

const commandFiles = readdirSync(path.join(__dirname, 'commands'))
  .filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}


const TOKEN = process.env.TOKEN;
const ROLE_ID = "1128692866567381025";

const JOIN_CHANNEL_ID = "1422509177481199669";
const LEAVE_CHANNEL_ID = "1491496841437773974";

client.on("ready", () => {
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

// ⚡ SLASH KOMUT İŞLEYİCİ
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`'${interaction.commandName}' adlı komut bulunamadı.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`Komut çalıştırılırken hata oluştu (${interaction.commandName}):`, err);
    const errorMsg = { content: '❌ Komut çalıştırılırken bir hata oluştu.', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMsg);
    } else {
      await interaction.reply(errorMsg);
    }
  }
});

client.login(TOKEN);
