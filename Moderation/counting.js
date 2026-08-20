const { SlashCommandBuilder, EmbedBuilder, PermissionBitField, ChannelType } = require('discord.js');
const counting = require('../../schemas/countingschema');

module.exports = {
        data: new SlashCommandBuilder()
        .setName('counting')
        .setDescription("try counting! maybe you'll learn a few numbers that way!")
        .addSubcommand(command => command.setName('setup').setDescription('setup the system').addChannelOption(Option.setName('channel').setDescription('channel to start the counting in').addChannelTypes(ChannelType.GuildText).setRequired(true)))
        .addSubcommand(command => command.setName('disable').setDescription('disable counting system :(')),
    async execute(interaction) {
        const { options } = interaction;
        const sub = options.getSubCommand()
        const data = await counting.findOne({ Guild: interaction.guild.id });

        if (!interaction.member.permission.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'no permissions', empheral: true })

        switch (sub) {
            case 'setup':

                if (data) {
                    return await interaction.reply({ content: 'already setup', mpheral: true })

                } else {
                    const channel = interaction.options.getChannel('channel');
                    await counting.create({
                        Guild: interaction.guild.id,
                        Channel: channel.id,
                        number: 1
                        })
                        const embed = new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription('🔢 system has just been setup!')
                        
                        await interaction.reply({embeds: [embed], ephemeral: true})
            }
            break;
            case 'disable':
                if(!data) {
                    return await interaction.reply({content: "you don't even fucking have a counting system", ephemeral: true})

                } else{
                    await counting.deleteOne({
                        Guild: interaction.guild.id,
                    });

                    const embed = new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription('counting system has just been disabled! :(')
                        
                        await interaction.reply({embeds: [embed], ephemeral: true})
                }


        }
    } 
}   