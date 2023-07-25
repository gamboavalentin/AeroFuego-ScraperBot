import { Client, Events, GatewayIntentBits, Partials, Message } from 'discord.js';

// Create a new client instance
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	partials: [Partials.Message, Partials.Channel],
});

// START
client.once(Events.ClientReady, c => {
    client.channels.fetch('1111097361826074645')
    .then(channel => {
        setTimeout(()=>{
            const hoy = new Date();
            channel.send(`:desktop: [${hoy.toLocaleString()}] [Scraper-BOT] => [RUN] => src/api/discord.js => [ON]`);
            
            console_log('RUN', 'src/api/discord.js', '[ON]');
	        console.log(`[${hoy.toLocaleString()}] [Scraper-BOT] => [RUN] => src/api/discord.js => [ON]`);
        }, 1000);
    });
    
});

//LOGIN
export function dsLogin(token){
    client.login(token);
}

//ERROR
export function console_error(url, message){
    client.channels.fetch('1111097768619024475')
    .then(channel => {
        setTimeout(()=>{
            const hoy = new Date();
            channel.send(`:red_square: [${hoy.toLocaleString()}] [Scraper-BOT] => [ERROR] => ${url} => ${message}`);
        }, 1000);
    })
}

//CONSOLE_LOG
export function console_log(type, url, message){
    client.channels.fetch('1111094551520755725')
    .then(channel => {
        setTimeout(()=>{
            const hoy = new Date();
            let icon;
            if(type == 'ACTION'){
                icon = ':green_square:';
            }
            else if(type == 'ERROR'){
                icon = ':red_square:';
            }
            else if(type == 'RUN'){
                icon = ':desktop:';
            }

            channel.send(`${icon} [${hoy.toLocaleString()}] [Scraper-BOT] => [${type}] => ${url} => ${message}`);
        }, 1000);
    })
}

//CICLOS DE EJECUCION
export function ciclosEjecucion(tipo, url, message){
    client.channels.fetch('1111392743139328010')
    .then(channel => {
        setTimeout(()=>{
            const hoy = new Date();
            channel.send(`${tipo == 'START' ? ':low_battery:' : ':battery:'} [${hoy.toLocaleString()}] [Scraper-BOT] => [${tipo}] => ${url} => ${message}`);
        }, 1000);
    })
}

//ALERTA PASAJE BARATO
export function alertPasajeBarato(){
    client.channels.fetch('1111095070616191016')
    .then(channel => {
        setTimeout(()=>{
            const hoy = new Date();
            channel.send(`:mailbox_with_mail: [${hoy.toLocaleString()}] [Scraper-BOT] => NEW PASAJE BARATO`);
        }, 1000);
    })
}

