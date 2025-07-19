const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rat')
        .setDescription('rat.'),
    async execute(interaction) {
        const rats = [
            'https://i.ibb.co/K0QhXNg/rat3.png',
            'https://i.ibb.co/TBNY3GK/rat9.png',
            'https://i.ibb.co/qpD6G9v/rat2.png',
            'https://i.ibb.co/F3fBRmX/rat7.png',
            'https://i.ibb.co/sFy93C2/rat1.png',
            'https://i.ibb.co/cyQNdMN/rat8.png',
            'https://i.ibb.co/Dt9s3QC/rat6.png',
            'https://i.ibb.co/XsCmN2b/rat5.png',
            'https://i.ibb.co/D9P3rr7/rat4.png',
            'https://bigrat.monster/media/bigrat.jpg'
        ];
        const randomRat = rats[Math.floor(Math.random() * rats.length)];

        await interaction.reply(randomRat);
    },
}