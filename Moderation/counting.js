import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType,
} from 'discord.js';
import Counting from '../Schemas/CountingSchema.js';

export default {
  data: new SlashCommandBuilder()
    .setName('counting')
    .setDescription('Try counting! Maybe you will learn a few numbers that way!')
    .addSubcommand((command) =>
      command
        .setName('setup')
        .setDescription('Set up the counting system')
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('Channel to start the counting in')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true),
        ),
    )
    .addSubcommand((command) =>
      command.setName('disable').setDescription('Disable the counting system'),
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const existing = await Counting.findOne({ Guild: interaction.guild.id });

    if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: 'No permissions.', ephemeral: true });
    }

    switch (sub) {
      case 'setup': {
        if (existing) {
          return interaction.reply({ content: 'Counting system is already set up.', ephemeral: true });
        }

        const channel = interaction.options.getChannel('channel');
        await Counting.create({
          Guild: interaction.guild.id,
          Channel: channel.id,
          Number: 1,
          LastUser: null,
        });

        const embed = new EmbedBuilder()
          .setColor('Blurple')
          .setDescription('🔢 The counting system has been set up!');

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      case 'disable': {
        if (!existing) {
          return interaction.reply({
            content: 'There is no counting system to disable.',
            ephemeral: true,
          });
        }

        await Counting.deleteOne({ Guild: interaction.guild.id });

        const embed = new EmbedBuilder()
          .setColor('Blurple')
          .setDescription('Counting system has been disabled.');

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      default:
        return interaction.reply({ content: 'Unknown counting action.', ephemeral: true });
    }
  },
};