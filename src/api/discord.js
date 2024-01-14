import { Client, Events, GatewayIntentBits, Partials } from 'discord.js'

// Icons
const icons = {
  RUN: ':desktop:',
  START: ':low_battery:',
  STOP: ':battery:',
  ACTION: ':green_square:',
  ERROR: ':red_square:',
  PB: ':mailbox_with_mail:'
}

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel]
})

// START
let dsOn = false
client.once(Events.ClientReady, c => {
  client.channels.fetch('1111097361826074645')
    .then(channel => {
      setTimeout(() => {
        dsOn = true
        const hoy = new Date()
        channel.send(`${icons.RUN} [${hoy.toLocaleString()}] [Scraper-BOT] => [RUN] => src/api/discord.js => [ON]`)

        consoleLog('RUN', 'src/api/discord.js', '[ON]')
        console.log(`[${hoy.toLocaleString()}] [Scraper-BOT] => [RUN] => src/api/discord.js => [ON]`)
      }, 1000)
    })
})

// LOGIN
export function dsLogin (token) {
  client.login(token)
}

// ERROR
export function consoleError (url, message) {
  client.channels.fetch('1111097768619024475')
    .then(channel => {
      setTimeout(() => {
        const hoy = new Date()
        channel.send(`${icons.ERROR} [${hoy.toLocaleString()}] [Scraper-BOT] => [ERROR] => ${url} => ${message}`)
      }, 1000)
    })
}

// CONSOLE_LOG
export function consoleLog (type, url, message) {
  client.channels.fetch('1111094551520755725')
    .then(channel => {
      setTimeout(() => {
        const hoy = new Date()
        channel.send(`${icons[type]} [${hoy.toLocaleString()}] [Scraper-BOT] => [${type}] => ${url} => ${message}`)
      }, 1000)
    })
}

// CICLOS DE EJECUCION
export function ciclosEjecucion (tipo, url, message) {
  client.channels.fetch('1111392743139328010')
    .then(channel => {
      setTimeout(() => {
        const hoy = new Date()
        channel.send(`${icons[tipo]} [${hoy.toLocaleString()}] [Scraper-BOT] => [${tipo}] => ${url} => ${message}`)
      }, 1000)
    })
}

// ALERTA NEW DATA
export function alertNewData () {
  client.channels.fetch('1111095070616191016')
    .then(channel => {
      setTimeout(() => {
        const hoy = new Date()
        channel.send(`${icons.PB} [${hoy.toLocaleString()}] [Scraper-BOT] => NEW DATA`)
      }, 1000)
    })
}

export { dsOn }
