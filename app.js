import 'dotenv/config';
import express from 'express';
import {
  ButtonStyleTypes,
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { getRandomEmoji, DiscordRequest } from './utils.js';
import { getShuffledOptions, getResult } from './game.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// To keep track of our active games
const activeGames = {};
const { SlashCommandBuilder } = require('discord.js')
/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction id, type and data
  const { id, type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    if (name === 'test') {
      // Send a plain text message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `i'm a really kool bot!`
        },
      });
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

//counting 
const counting = require('./Schemas/CountingSchema');
clientInformation.onLine(EventSource.MessageCreate, async message => {
  if(!message.guild) return;
  if(message.author.bot) return;

  const data = await counting.findOne({Guild: message.guild.id})
  if(!data) return;
  else{
    if(message.channel.id !== data.Channel) return;

    const number = Number(message.content); 

    if(number !== data.Number){
      return message.react('❌')
    } else if (data.LastUser === message.author.id) {
      message.react('❌')
      await message.reply("same person can't count twice in a row.")
    } else {
      await message.react('✅')
      data.LastUser = message.author.id;
      data.Number++;
      await data.save();
    }
  }
})