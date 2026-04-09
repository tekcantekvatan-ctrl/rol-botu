// commands/buy.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    // ── Komut Tanımı ────────────────────────────────────────────────────
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Tüm ürünlerin fiyat listesini gösterir'),

    // ── Komut Çalıştırma (execute) ──────────────────────────────────────
    async execute(interaction) {

        // ------------------- Ürün veri tabanı -------------------
        // Yeni ürün eklemek için buraya bir nesne daha ekleyin.
        const urunDB = {
            premium: {
                emoji: '⭐',
                price: '49,99 TL',
                link: 'https://ornek.com/premium',   // ← kendi linkinizi koyun
                description: 'Sunucu içinde tüm premium özellikler.'
            },
            vip: {
                emoji: '💎',
                price: '79,99 TL',
                link: 'https://ornek.com/vip',
                description: 'VIP rolü ve özel kanallar.'
            },
            boost: {
                emoji: '🚀',
                price: '19,99 TL',
                link: 'https://ornek.com/boost',
                description: 'Sunucu boost paketi.'
            }
        };

        // ------------------- Fiyat listesi embed'i -------------------
        const embed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('🛒 Fiyat Listesi')
            .setDescription('Aşağıdaki paketlerden birini satın almak için ilgili linke tıklayın.')
            .setFooter({ text: `${interaction.user.username} tarafından istendi • Alışveriş Botu` })
            .setTimestamp();

        // Her ürün için ayrı bir field ekle
        for (const [ad, data] of Object.entries(urunDB)) {
            const baslik = `${data.emoji} ${ad.charAt(0).toUpperCase() + ad.slice(1)}`;
            const icerik = [
                `💰 **Fiyat:** ${data.price}`,
                `📄 **Açıklama:** ${data.description}`,
                `🔗 **Satın Al:** [Tıkla](${data.link})`
            ].join('\n');

            embed.addFields({ name: baslik, value: icerik, inline: false });
        }

        await interaction.reply({ embeds: [embed] });
    }
};
