import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: './src/config/.env' });


//-----------------DISCORD-----------------//
import {dsLogin} from './api/discord.js';
dsLogin(process.env.DISCORD_TOKEN);

//-----------------SEVIDOR UBUNTU-----------------//
const servidor_ubuntu = true;

//-----------------COMBINACIONES-----------------//
const combinaciones_list = [
    ["ushuaia", "cordoba"],
    ["ushuaia", "buenosaires"],
    ["riogrande", "cordoba"],
    ["riogrande", "buenosaires"]
];

//-----------------TRIGGER-----------------//
const trigger = {
    ida: 25000,
    ida_vuelta: 50000
};

//-----------------MESES-----------------//
const cant_meses = 8;

//-----------------INICIALIZACION-----------------//
import { timer, loadDB } from './utils/timer.js';

await loadDB();
timer();

export {trigger, cant_meses, combinaciones_list, servidor_ubuntu}