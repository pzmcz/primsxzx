const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const npmInstall = promisify(exec);
const clearConsole = () => exec(process.platform === 'win32' ? 'cls' : 'clear');

async function installDiscordJS(callback) {
  try {
    console.log("Installing discord.js...");
    await clearConsole();

    if (isDiscordJSPresent()) {
      console.log("discord.js is already installed! Run updateDiscordJS to update to the latest version.");
      return;
    }

    console.log("Fetching discord.js@latest");
    await clearConsole();

    console.log("Installing discord.js@latest");
    await clearConsole();

    console.log("Please wait as this process takes a while...");
    await npmInstall('npm install discord.js@latest');
    await clearConsole();

    console.log("discord.js installed successfully.");
    await clearConsole();

    await generateBotTemplate();
    await clearConsole();

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(`Error installing discord.js: ${error.message}`);
  }
}

async function updateDiscordJS(callback) {
  try {
    console.log("Updating discord.js...");
    await clearConsole();

    if (!isDiscordJSPresent()) {
      console.log("discord.js is not installed! Run installDiscordJS to install the latest version!");
      return;
    }

    console.log("Updating discord.js@latest");
    await clearConsole();

    console.log("Please wait as this process takes a while...");
    await npmInstall('npm install discord.js@latest');
    await clearConsole();

    console.log("discord.js updated successfully.");
    await clearConsole();

    await generateBotTemplate();
    await clearConsole();

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(`Error updating discord.js: ${error.message}`);
  }
}

async function generateBotTemplate() {
  const botTemplate = `const { Discord, Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ],
});

client.once('ready', () => {
    console.log("Logged in as "+client.user.tag+"!");
    client.application.commands.create({
        name: 'ping',
        description: 'Ping command to check bot latency.',
    });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login('TOKEN_HERE'); // Replace with your bot token`;

  const indexFilePath = './index.js';

  try {
    await fs.promises.writeFile(indexFilePath, botTemplate);
    console.log(`Basic Discord bot template generated in ${indexFilePath}`);
  } catch (error) {
    console.error(`Error generating bot template: ${error.message}`);
  }
}

function isDiscordJSPresent() {
  try {
    require.resolve('discord.js');
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  installDiscordJS,
  updateDiscordJS
};
