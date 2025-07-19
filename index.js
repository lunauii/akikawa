// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const cron = require('node-cron');

// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	]
 });

//Load all commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(token);

cron.schedule('* * 16 1-6,9-11 *', () => {
	client.guilds.fetch().then(guilds => {
		for (const guild of guilds.values()) {
			try {
				guild.fetch().then(guild => {
					guild.channels.fetch().then(channels => {
						console.log(`There are ${channels.size} channels.`);
						if (channels.size > 0) {
							for (const channel of channels.values()) {
								if (channel.name.includes('💬general💬')) {
									channel.send(`# :warning: GET YOUR MONTHLY UPASS!! :warning:
										\n-# This is an automated reminder to get your UPass at https://upassbc.translink.ca/, and is sent every 16th of the month.`);
								}
							}
						} else {
							console.log(`No channel found in guild ${guild.name} with name containing "general"`);
						}
					}).catch(console.error);
				}).catch(console.error);
			} catch (error) {
				console.log(`Error fetching channels for guild ${guild.name}: ${error.message}`);
			}
		}
	}).catch(error => {
		console.log(`Error fetching guilds: ${error.message}`);
	});
});

cron.schedule('* * 26 1-6,9-11 *', () => {
	client.guilds.fetch().then(guilds => {
		for (const guild of guilds.values()) {
			try {
				guild.fetch().then(guild => {
					guild.channels.fetch().then(channels => {
						console.log(`There are ${channels.size} channels.`);
						if (channels.size > 0) {
							for (const channel of channels.values()) {
								if (channel.name.includes('💬general💬')) {
									channel.send(`# :warning: GET YOUR MONTHLY UPASS!! :warning:
										\n-# This is an automated reminder to get your UPass at <https://upassbc.translink.ca/>.\n-# If you somehow didn't see the comically large first reminder that was sent on the 16th, this is the final reminder for this month.`);
								}
							}
						} else {
							console.log(`No channel found in guild ${guild.name} with name containing "general"`);
						}
					}).catch(console.error);
				}).catch(console.error);
			} catch (error) {
				console.log(`Error fetching channels for guild ${guild.name}: ${error.message}`);
			}
		}
	}).catch(error => {
		console.log(`Error fetching guilds: ${error.message}`);
	});
});