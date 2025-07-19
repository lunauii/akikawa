const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('execute')
        .setDescription('guillotine go brrr')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to execute')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        const executeEmbed = new EmbedBuilder()
        .setColor(0x266CC3)
        .setTitle('woah')
        .setDescription(`<@${user.id}> got sent to the guillotine`)
        .setImage('https://s13.gifyu.com/images/SeQzL.gif')
        .setTimestamp()
        .setFooter({ text: 'ayuki.js', iconURL: 'https://cdn.discordapp.com/avatars/1309832514482864178/382343d127e59aeb469d3544a5889e62.webp' });
        
        await interaction.reply({ content:`||<@${user.id}>||`, embeds: [executeEmbed], flags: MessageFlags.SuppressNotifications });
    },
}