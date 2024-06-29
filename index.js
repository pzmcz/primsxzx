const { exec } = require('child_process');

async function installDiscordJS(callback) {
  console.log("Installing discord.js...");
  console.log("Fetching discord.js@latest");

  exec('npm install discord.js@latest', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing discord.js: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error installing discord.js: ${stderr}`);
      return;
    }
    console.log(`discord.js installed successfully.`);
    if (callback) {
      callback();
    }
  });
}

module.exports = {
  installDiscordJS
};