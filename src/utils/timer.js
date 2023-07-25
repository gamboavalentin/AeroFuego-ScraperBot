import {startBrowser} from '../config/browser.js';
import scrapeAll from '../controllers/pageController.js';
import { algoritmoPasaje, alertaMejorPrecio, mejorCombinacion } from './algoritmos.js';
import { combinaciones_list, servidor_ubuntu } from '../app.js';
import { consoleViewAction, consoleViewError } from './consoleView.js';
import { alertPasajeBarato, ciclosEjecucion } from '../api/discord.js';

import * as url from 'url';
import fs from 'fs';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

var min = -1;
var min_00 = false;
var min_30 = false;

var url_db;
var aero_list_mejor_precio;

async function loadDB(){
    if(servidor_ubuntu){
        url_db = '/home/gambolas/nodejs/af/public/aerolineasScrap.json';
    }
    else{
        url_db = __dirname + "../../../public/aerolineasScrap.json";
    }
    
    aero_list_mejor_precio = await JSON.parse(await fs.readFileSync(url_db));
}

var scraper_on = false;

function timer() {
    var x = setInterval(async ()=>{
        const hoy = new Date();
        min = hoy.getMinutes();

        if(min == 59) min_00 = false;
        else if(min == 29) min_30 = false;

        if(((hoy.getMinutes() == 0 && !min_00) || (hoy.getMinutes() == 30 && !min_30)) && !scraper_on){
            scraper_on = true;
            consoleViewAction('src/utils/timer.js', 'timer', `trigger ${hoy.toLocaleTimeString()} [START]`);
            ciclosEjecucion('START', 'src/utils/timer.js', `timer => trigger [${hoy.toLocaleTimeString()}] [START]`);

            var combinaciones = [];
            if(hoy.getMinutes() == 0) {
                min_00 = true;
                combinaciones.push(combinaciones_list[0]);
                combinaciones.push(combinaciones_list[1]);
            }
            else if(hoy.getMinutes() == 30) {
                min_30 = true
                combinaciones.push(combinaciones_list[2]);
                combinaciones.push(combinaciones_list[3]);
            }

            let browserInstance = startBrowser();

            //AERO_LIST_NEW
            var scarp = await scrapeAll(browserInstance, combinaciones);

            var aero_list_new = algoritmoPasaje(scarp);

            try {
                //AERO_LIST_MEJOR_PRECIO
                const aero_list_mejor_precio_new = await alertaMejorPrecio(aero_list_new, aero_list_mejor_precio);

                if(!aero_list_mejor_precio_new.error){
                    aero_list_mejor_precio = aero_list_mejor_precio_new.list;
                    await fs.writeFileSync(url_db, JSON.stringify(aero_list_mejor_precio));

                    //Alerta Discord
                    if(aero_list_mejor_precio_new.new_alerta){
                        setTimeout(() => {alertPasajeBarato()}, 10000);
                    }

                    consoleViewAction('src/utils/timer.js', 'timer', `extraccion de datos OK`);
                    ciclosEjecucion('STOP', 'src/utils/timer.js', `timer => trigger [${new Date().toLocaleTimeString()}] [STOP]`);
                }
            
            } catch (error) {
                consoleViewError('src/utils/timer.js', 'timer', `alertaMejorPrecio [${error}]`);
            }
            scraper_on = false;
        }
    }, 1000);
}

export {timer, aero_list_mejor_precio, loadDB}