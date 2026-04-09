// commands/buy.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    // ────────────────── Komut tanımı ──────────────────
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Satın alım linki ve fiyatını gösterir')
        .addStringOption(opt =>
            opt.setName('urun')
                .setDescription('Satın almak istediğiniz ürünün adı')
                .setRequired(true)),

    // ────────────────── Çalıştırma (execute) ──────────────────
    async execute(interaction) {
        const urun = interaction.options.getString('urun').toLowerCase();

        // ------------------- Ürün veri tabanı -------------------
        // Bu objeyi bir JSON dosyasına taşıyabilirsiniz (isteğe bağlı)
        const urunDB = {
            premium: {
                price: '49,99 TL',
                link: 'https://ornek.com/premium',
                description: 'Sunucu içi tüm premium özellikler.'
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

        // ------------------- Hata kontrolü -------------------
        if (!urunDB[urun]) {
            return interaction.reply({
                content: `❌ **${urun}** adlı bir ürün bulunamadı. Lütfen geçerli bir ürün adı girin.`,
                ephemeral: true               // sadece komutu kullanan görür
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
