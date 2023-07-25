import pageScraper from '../utils/pageScraper.js';
import Urls from '../models/urls.js';
import { cant_meses } from '../app.js';
import { consoleViewAction, consoleViewError } from '../utils/consoleView.js';
var browserInstance_cache;
var combinaciones_cache;

export default async function scrapeAll(browserInstance, combinaciones){
    browserInstance_cache = browserInstance;
    combinaciones_cache = combinaciones;

	let browser;
	try{
		browser = await browserInstance;
	}
	catch(error){

	}
    var aero_list = {};

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if(req.resourceType() == 'font' || req.resourceType() == 'image' ){
            req.abort();
        }
        else {
            req.continue();
        }
    });

    page.setDefaultTimeout(180000);

    for (let z = 0; z < combinaciones.length; z++) {

        const dateSearch = new Date();
        dateSearch.setDate(16);

        for (let i = -1; i < cant_meses; i++) {
            consoleViewAction('src/controllers/pageController.js', 'scrapeAll', `cargando pagina: comb [${combinaciones[z]}] mes: [${i+1}/${cant_meses}]`);
            var primerMes = false;
            if(i != 0) {dateSearch.setMonth(dateSearch.getMonth() + 1)}
            if (i == -1){primerMes = true}

            var url = new Urls();
            url.origen = url.provincias[combinaciones[z][0]];
            url.destino = url.provincias[combinaciones[z][1]];
            url.fechaIda = dateSearch;
            url.setDates_calendar();
        
            try {
                var aero_info = null;
                do {
                    aero_info = await pageScraper(page, url, primerMes);
                    if(aero_info.error){
                        if(aero_info.tipo[0] == "dia" && aero_info.tipo[1] == "ida"){
                            url.setDates_calendarFIda();
                        }
                        else if(aero_info.tipo[0] == "dia" && aero_info.tipo[1] == "vuelta"){
                            url.setDates_calendarFVuelta();
                        }
                        else if(aero_info.tipo[0] == "mes" && aero_info.tipo[1] == "ida y vuelta"){
                            return;
                        }
                    }
                } while (aero_info.error);
            
                for (const comb in aero_info) {
                    aero_list[comb] = aero_list[comb] ? aero_list[comb] : {anos: {}};
                    if(aero_list[comb].anos[aero_info[comb].ano]){
                        await Object.assign(aero_list[comb].anos[aero_info[comb].ano].meses, aero_info[comb].list);
                    }
                    else{
                        aero_list[comb].anos[aero_info[comb].ano] = {meses: {}};
                        aero_list[comb].anos[aero_info[comb].ano].meses = aero_info[comb].list;
                    }
                }
            } catch (error) {
                consoleViewError('src/controllers/pageController.js', 'scrapeAll', `Error de Carga de Pagina: ${error}`);
            }
        }
    }

    await page.close();
    await browser.close();

    return aero_list;
}