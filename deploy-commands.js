// deploy-commands.js
require('dotenv').config();                           // .env dosyasını oku
const { REST, Routes } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');

// ------------------- 1️⃣ Tüm komutları topla -------------------
const commands = [];
const commandFiles = readdirSync(path.join(__dirname, 'commands'))
    .filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
    const cmd = require(`./commands/${file}`);
    commands.push(cmd.data.toJSON());
}

// ------------------- 2️⃣ REST istemcisi -------------------
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// ------------------- 3️⃣ Guild‑specific (test) veya Global -------------------
(async () => {
    try {
        console.log('🔄 Slash komutları Discord API\'ye gönderiliyor...');

        // ---- GUILD‑SPECIFIC (test sunucun) ----
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        // ---- PROD’da global yapmak istersen aşağıdaki satırı aktif et ----
        // await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

        console.log('✅ Tüm slash komutları başarıyla yüklendi!');
    } catch (e) {
        console.error('❌ Komut kaydı hatası:', e);
    }
})();
