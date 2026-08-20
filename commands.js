import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
};

// Minimal counting command for the app
const COUNTING_COMMAND = {
  name: 'counting',
  description: 'Start or stop the counting game',
  type: 1,
};

const ALL_COMMANDS = [TEST_COMMAND, COUNTING_COMMAND];

if (!process.env.APP_ID) {
  console.error('APP_ID is missing. Set it in .env before running npm run register.');
} else {
  InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
}
