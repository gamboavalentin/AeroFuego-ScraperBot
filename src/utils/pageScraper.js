import Url from '../models/urls.js'
import { consoleViewError } from './consoleView.js';

async function aeroScraper(page, type){

    var list = {};
    //año
    var ano = await page.$eval(`.fdc-${type}-box .header-title`, text => text.textContent);
    ano = ano.split(" ")[4];
    //mes
    const mes = await page.$eval(`.fdc-${type}-box .fdc-month`, text => text.textContent);
    
    //Extraer Infor de los Bloques de Dias
    const day_list = await page.$$eval(`.fdc-${type}-box div[class=react-calendar__month-view__days] > button`, list => {
        //eliminar dias de otros meses
        list = list.filter(day => !day.querySelector('.fdc-unavailable-day'));

        list = list.map(day => {
            var datos = {dia: null, precio: null, etiqueta: null}
            //solo los dias con precios
            if(day.querySelector('.fdc-available-day')){
                //precio
                datos.precio = parseInt(day.querySelector('.fdc-button-price').textContent);

                //etiqueta
                if(day.querySelector('.fdc-icon-ticket-star')){
                    datos.etiqueta = "Mejor precio del mes";
                }

            }
            //dia
            datos.dia = day.querySelector('.fdc-button-day').textContent;
            return datos;
        });
        return list
    });
    list[mes] = {dias: day_list};
    
    return {ano, mes, list};
}

export default async function pageScraper(page, url = new Url, primerMes){
    var err = false;
    var err_count = 0;
    do {
        err = false;

        try {
            var page_url = "";
            if(primerMes) {page_url = url.dates_calendar_one_way}
            else {page_url = url.dates_calendar}

            await Promise.all([
                page.waitForNavigation(),
                await page.goto(page_url, { waitUntil: 'load'})
            ]);
        
        } catch (error) {
            err_count++;
            err = true;
            consoleViewError('src/utils/pageScraper.js', 'pageScraper', `Error page.goto: ${error}`);
        }

        if(!err){
            try {
                if(await page.$eval(`.search-box`, text => text.querySelector('.styled__UnavailableFlightDateErrorContainer-sc-1sduzq6-3.kHterR'))){
                    return {error: true, tipo: ["dia", "ida"]};
                }
            
                if(await page.$eval(`.fdc-from-box`, text => text.querySelector('.fdc-button-text span').textContent == 'Sin vuelos')){
                    return {error: true, tipo: ["dia", "vuelta"]};
                }
                else if(await page.$eval(`.fdc-to-box`, text => text.querySelector('.fdc-button-text span').textContent == 'Sin vuelos')){
                    return {error: true, tipo: ["mes", "ida y vuelta"]};
                }
            } catch (error) {

            }

            await page.waitForTimeout(10000);

            //espera a que carge los calendarios
            try {
                await page.waitForSelector('.fdc-from-box');
            } catch (error) {
                err_count++;
                err = true;
                //consoleViewError('src/utils/pageScraper.js', 'pageScraper', `Error page.waitForSelector: ${error}`);
            }
        }

    } while (err && err_count < 5);
    
    const data = {};

    if(primerMes){
        data[`${url.destino.toLowerCase()}-${url.origen.toLowerCase()}`] = await aeroScraper(page, "from");
    }
    else{
        data[`${url.origen.toLowerCase()}-${url.destino.toLowerCase()}`] = await aeroScraper(page, "from");
        data[`${url.destino.toLowerCase()}-${url.origen.toLowerCase()}`] = await aeroScraper(page, "to");
    }

    return data;
}