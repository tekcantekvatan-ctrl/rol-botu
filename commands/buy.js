// commands/buy.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    // ── Komut Tanımı (setName('buy') kesinlikle **buy** olmalı) ────────
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Satın alım linki ve fiyatını gösterir')
        .addStringOption(opt =>
            opt.setName('urun')
               .setDescription('Satın almak istediğiniz ürünün adı')
               .setRequired(true)),

    // ── Komut Çalıştırma (execute) ──────────────────────────────────────
    async execute(interaction) {
        // Kullanıcıdan gelen değer → küçük harfe çevir (karşılaştırma kolaylığı)
        const urun = interaction.options.getString('urun').toLowerCase();

        // ------------------- Ürün veri tabanı -------------------
        // İsterseniz bu kısmı ayrı bir JSON dosyasına taşıyabilirsiniz.
        const urunDB = {
            premium: {
                price: '49,99 TL',
                link: 'https://ornek.com/premium',   // ← kendi linkinizi koyun
                description: 'Sunucu içinde tüm premium özellikler.'
            },
            vip: {
                price: '79,99 TL',
                link: 'https://ornek.com/vip',
                description: 'VIP rolü ve özel kanallar.'
            },
            boost: {
                price: '19,99 TL',
                link: 'https://ornek.com/boost',
                description: 'Sunucu boost paketi.'
            }
        };

        // ------------------- Geçerli ürün kontrolü -------------------
        if (!urunDB[urun]) {
            return interaction.reply({
                content: `❌ **${urun}** adlı bir ürün bulunamadı. Lütfen geçerli bir ürün adı girin.`,
                ephemeral: true                     // sadece komutu kullanan görür
            });
        }

        const data = urunDB[urun];

        // ------------------- Embed (görsel mesaj) -------------------
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle(`🛒 ${urun.charAt(0).toUpperCase() + urun.slice(1)} Satın Al`)
            .setDescription(`**${data.price}** karşılığında aşağıdaki link üzerinden satın alabilirsiniz.`)
            .addFields(
                { name: 'Açıklama', value: data.description, inline: false },
                { name: 'Satın Al Linki', value: `[Tıkla](${data.link})`, inline: true }
            )
            .setFooter({ text: `${interaction.user.username} - Alışveriş Botu` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
