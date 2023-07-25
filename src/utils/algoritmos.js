import { trigger } from "../app.js";
import { consoleViewAction, consoleViewError } from "./consoleView.js";

const meses_list = {"enero": 1, "febrero": 2, "marzo": 3, "abril": 4, "mayo": 5, "junio": 6,"julio": 7, "agosto": 8, "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12}

function algoritmoPasaje(aero_list){
    var promedio_list = {combinacion: [], ano: [], mes: []}
    var mejor_precio = {combinacion: {}, ano: {}, mes: {}}

    for (const combinacion in aero_list){
        mejor_precio.combinacion = {precio: 0};
        promedio_list.combinacion = [];

        for (const ano in aero_list[combinacion].anos){
            mejor_precio.ano = {precio: 0};
            promedio_list.ano = [];

            for (const mes in aero_list[combinacion].anos[ano].meses) {
                mejor_precio.mes = {precio: 0};
                promedio_list.mes = [];

                aero_list[combinacion].anos[ano].meses[mes].dias.forEach(dia => {
                    if(dia.precio){
                        //MES
                        if (mejor_precio.mes.precio == 0 || dia.precio < mejor_precio.mes.precio || dia.precio == mejor_precio.mes.precio){
                            if(dia.precio == mejor_precio.mes.precio){
                                mejor_precio.mes.fecha.push({dia: parseInt(dia.dia), mes: meses_list[mes], ano: parseInt(ano)});
                            }
                            else{
                                mejor_precio.mes = {fecha: [{dia: parseInt(dia.dia), mes: meses_list[mes], ano: parseInt(ano)}], precio: dia.precio, etiqueta: dia.etiqueta};
                            }
                        }
                        promedio_list.mes.push(dia.precio);
                        //AÑO
                        if (mejor_precio.ano.precio == 0 || dia.precio < mejor_precio.ano.precio || dia.precio == mejor_precio.ano.precio){  
                            if(dia.precio == mejor_precio.ano.precio){
                                mejor_precio.ano.fecha.push({dia: parseInt(dia.dia), mes: meses_list[mes], ano: parseInt(ano)});
                            }
                            else{
                                mejor_precio.ano = {fecha: [{dia: parseInt(dia.dia), mes: meses_list[mes], ano: parseInt(ano)}], precio: dia.precio, etiqueta: dia.etiqueta};
                            }
                        }
                        promedio_list.ano.push(dia.precio);
                        //COMBINACION
                        if (mejor_precio.combinacion.precio == 0 || dia.precio < mejor_precio.combinacion.precio || dia.precio == mejor_precio.combinacion.precio){
                            if(dia.precio == mejor_precio.combinacion.precio){
                                mejor_precio.combinacion.fecha.push({dia: parseInt(dia.dia), mes: meses_list[mes], ano: parseInt(ano)})
                            }
                            else{
                                mejor_precio.combinacion = {fecha: [{dia: parseInt(dia.dia), mes: meses_list[mes], ano: parseInt(ano)}], precio: dia.precio, etiqueta: dia.etiqueta};
                            }
                        }
                        promedio_list.combinacion.push(dia.precio);
                    };
                });
                
                aero_list[combinacion].anos[ano].meses[mes]["mejor_precio"] = {ida: mejor_precio.mes};
                aero_list[combinacion].anos[ano].meses[mes]["mejor_precio"].ida["promedio"] = calcularPromedio(promedio_list.ano);
            }
            
            aero_list[combinacion].anos[ano]["mejor_precio"] = {ida: mejor_precio.ano};
            aero_list[combinacion].anos[ano]["mejor_precio"].ida["promedio"] = calcularPromedio(promedio_list.ano);
        }
        
        aero_list[combinacion]["mejor_precio"] = {ida: mejor_precio.combinacion};
        aero_list[combinacion]["mejor_precio"].ida["promedio"] = calcularPromedio(promedio_list.combinacion);
    }

    return aero_list;
}


async function alertaMejorPrecio(aero_list_new, aero_list_old){
    var new_alerta = false;
    var alerta_mejor_precio = {};
    try {
        if(aero_list_old){
            //RESET ALERTAS
            for (const combinacion in aero_list_old) {
                //COMBINACIONES
                aero_list_old[combinacion].mejor_precio.ida.alerta = false;
                for (const ano in aero_list_old[combinacion].anos) {
                    //AÑOS
                    aero_list_old[combinacion].anos[ano].mejor_precio.ida.alerta = false;
                    for (const mes in aero_list_old[combinacion].anos[ano].meses) {
                        //MESES
                        aero_list_old[combinacion].anos[ano].meses[mes].mejor_precio.ida.alerta = false;
                    }
                }
            }
        }

        for (const combinacion in aero_list_new) {
            //COMBINACIONES
            alerta_mejor_precio[combinacion] = {anos: {}, mejor_precio: {ida:{alerta: false}}};

            alerta_mejor_precio[combinacion].mejor_precio.ida = aero_list_new[combinacion].mejor_precio.ida;

            if(!aero_list_old[combinacion] ||
                (aero_list_new[combinacion].mejor_precio.ida.precio != aero_list_old[combinacion].mejor_precio.ida.precio && 
                aero_list_new[combinacion].mejor_precio.ida.precio < trigger.ida)) {
                    alerta_mejor_precio[combinacion].mejor_precio.ida["alerta"] = true;
                    consoleViewAction('src/utils/algoritmo.js', 'alertaMejorPrecio', `alerta mejor precio combinacion [${combinacion}] [IDA]`);
                    new_alerta = true;
            }
            else alerta_mejor_precio[combinacion].mejor_precio.ida["alerta"] = false;

            for (const ano in aero_list_new[combinacion].anos) {
                //AÑOS
                alerta_mejor_precio[combinacion].anos[ano] = {meses: {}, mejor_precio: {ida:{alerta: false}}};

                alerta_mejor_precio[combinacion].anos[ano].mejor_precio.ida = aero_list_new[combinacion].anos[ano].mejor_precio.ida;

                if(!aero_list_old[combinacion] ||
                    !aero_list_old[combinacion].anos[ano] ||
                    (aero_list_new[combinacion].anos[ano].mejor_precio.ida.precio != aero_list_old[combinacion].anos[ano].mejor_precio.ida.precio && 
                    aero_list_new[combinacion].anos[ano].mejor_precio.ida.precio < trigger.ida)) {
                        alerta_mejor_precio[combinacion].anos[ano].mejor_precio.ida["alerta"] = true;
                }
                else alerta_mejor_precio[combinacion].anos[ano].mejor_precio.ida["alerta"] = false;

                for (const mes in aero_list_new[combinacion].anos[ano].meses) {
                    //MESES
                    alerta_mejor_precio[combinacion].anos[ano].meses[mes] = {mejor_precio: {ida:{alerta: false}}};

                    alerta_mejor_precio[combinacion].anos[ano].meses[mes].mejor_precio.ida = aero_list_new[combinacion].anos[ano].meses[mes].mejor_precio.ida;
                    
                    if(!aero_list_old[combinacion] ||
                        !aero_list_old[combinacion].anos[ano]||
                        !aero_list_old[combinacion].anos[ano].meses[mes] ||
                        (aero_list_new[combinacion].anos[ano].meses[mes].mejor_precio.ida.precio != aero_list_old[combinacion].anos[ano].meses[mes].mejor_precio.ida.precio
                        && aero_list_new[combinacion].anos[ano].meses[mes].mejor_precio.ida.precio < trigger.ida)) {
                            alerta_mejor_precio[combinacion].anos[ano].meses[mes].mejor_precio.ida["alerta"] = true;
                        }
                    else alerta_mejor_precio[combinacion].anos[ano].meses[mes].mejor_precio.ida["alerta"] = false;
                }
            }
        }   
        
    } catch (error) {
        consoleViewError('src/utils/algoritmo.js', 'alertaMejorPrecio', `Error: ${error}`);
        return {error: true}
    }
    
    return await mejorCombinacion(alerta_mejor_precio, aero_list_old, new_alerta);
}

function mejorCombinacion(aero_list, aero_list_old, new_alerta){
    var mejor_combinacion = {};

    try {
        //RESET ALERTAS COMBINACIONES
        for (const combinacion in aero_list_old) {
            //COMBINACIONES
            aero_list_old[combinacion].mejor_precio.ida_vuelta.alerta = false;
        }

        for (const comb in aero_list) {
            mejor_combinacion[comb] = {
                anos: aero_list[comb].anos,
                mejor_precio: {
                    ida: aero_list[comb].mejor_precio.ida,
                    ida_vuelta: {alerta: false}
                }
            };

            const comb_ida = comb;
            const comb_vuelta = `${comb.split("-")[1]}-${comb.split("-")[0]}`;
    
            //Compara las fechas de los mejores precios
            var found = false;
            var dias = {min: null, max: null};
            aero_list[comb_ida].mejor_precio.ida.fecha.forEach(fecha_ida => {
                const ida_mejor_precio = new Date(fecha_ida.ano, fecha_ida.mes - 1, fecha_ida.dia);
                
                aero_list[comb_vuelta].mejor_precio.ida.fecha.forEach(fecha_vuelta => {
                    const vuelta_mejor_precio = new Date(fecha_vuelta.ano, fecha_vuelta.mes - 1, fecha_vuelta.dia);
                 
                    const dias_combinacion = dias_entre_fechas(ida_mejor_precio, vuelta_mejor_precio);

                    if(dias_combinacion != -1 && dias_combinacion > 2 && dias_combinacion <= 30){
                        found = true;
                    }

                    if(dias_combinacion > 0){
                        if(!dias.min || dias_combinacion < dias.min){
                            dias.min = dias_combinacion;
                        }
                        if(!dias.max || dias_combinacion > dias.max){
                            dias.max = dias_combinacion;
                        }
                    }
                });
            })

            if(found){
                const precio = aero_list[comb_ida].mejor_precio.ida.precio + aero_list[comb_vuelta].mejor_precio.ida.precio;
                var alerta = false;

                if(!aero_list_old[comb]
                    || !aero_list_old[comb].mejor_precio.ida_vuelta
                    || !aero_list_old[comb].mejor_precio.ida_vuelta.precio
                    || (precio != aero_list_old[comb].mejor_precio.ida_vuelta.precio && precio < trigger.ida_vuelta)){
                    alerta = true;
                    new_alerta = true;
                    consoleViewAction('src/utils/algoritmo.js', 'mejorCombinacion', `alerta mejor precio combinacion [${comb}] [IDA_VUELTA]`);
                }
            
                mejor_combinacion[comb].mejor_precio.ida_vuelta = {
                        ida: aero_list[comb_ida].mejor_precio.ida,
                        vuelta: aero_list[comb_vuelta].mejor_precio.ida,
                        precio:  precio,
                        dias: dias,
                        alerta: alerta
                }
            }
            else{
                //Comparar los meses
                var mejor_combinacion_mes = {
                    ida: {},
                    vuelta: {},
                    precio:  0,
                    dias: {min: null, max: null}
                }
                
                for (const ano in aero_list[comb_ida].anos) {
                    //Años

                    for (const mes in aero_list[comb_ida].anos[ano].meses) {
                        //Meses

                        //Fecha Ida
                        aero_list[comb_ida].anos[ano].meses[mes].mejor_precio.ida.fecha.forEach(fecha_ida => {
                            const ida_mes_mp = new Date(fecha_ida.ano, fecha_ida.mes - 1, fecha_ida.dia);
        
                            var count_meses = 0;
                            do {
                                count_meses++;
                                var mes_vuelta;
                                var ano_vuelta;

                                if(count_meses == 1){
                                    ano_vuelta = ano;
                                    mes_vuelta = mes;
                                }
                                else if(count_meses == 2){
                                    if(mes == "diciembre"){
                                        ano_vuelta = `${parseInt(ano) + 1}`;
                                        mes_vuelta = "enero";
                                    }
                                    else{
                                        var nextMonth = false;
                                        for (const mes_ in meses_list) {
                                            if(nextMonth) {
                                                ano_vuelta = ano;
                                                mes_vuelta = mes_
                                            };
                                            if(mes_ == mes) {nextMonth = true};
                                        }
                                    }
                                }
        
                                if(aero_list[comb_vuelta].anos[ano_vuelta] && aero_list[comb_vuelta].anos[ano_vuelta].meses[mes_vuelta]){
                                    
                                    //Fecha Vuelta
                                    var found_meses = false;
                                    var dias_meses = {min: null, max: null};
                                    const precio_combinacion = aero_list[comb_ida].anos[ano].meses[mes].mejor_precio.ida.precio + aero_list[comb_vuelta].anos[ano_vuelta].meses[mes_vuelta].mejor_precio.ida.precio;
                                            
                                    aero_list[comb_vuelta].anos[ano_vuelta].meses[mes_vuelta].mejor_precio.ida.fecha.forEach(fecha_vuelta => {

                                        const vuelta_mes_mp = new Date(fecha_vuelta.ano, fecha_vuelta.mes - 1, fecha_vuelta.dia);
    
                                        const dias_combinacion = dias_entre_fechas(ida_mes_mp, vuelta_mes_mp);

                                        if(dias_combinacion != -1 
                                            && dias_combinacion > 2 
                                            && dias_combinacion <= 30 
                                            && (mejor_combinacion_mes.precio == 0 || mejor_combinacion_mes.precio > precio_combinacion)){
                                                found_meses = true;
                                        }

                                        if(dias_combinacion > 0){
                                            if(!dias_meses.min || dias_combinacion < dias_meses.min){
                                                dias_meses.min = dias_combinacion;
                                            }
                                            if(!dias_meses.max || dias_combinacion > dias_meses.max){
                                                dias_meses.max = dias_combinacion;
                                            }
                                        }
                                    });

                                    if(found_meses){
                                        var alerta = false;

                                        if(!aero_list_old[comb]
                                            || !aero_list_old[comb].mejor_precio.ida_vuelta
                                            || !aero_list_old[comb].mejor_precio.ida_vuelta.precio
                                            || (precio_combinacion != aero_list_old[comb].mejor_precio.ida_vuelta.precio && precio_combinacion < trigger.ida_vuelta)){
                                            alerta = true;
                                        }

                                        mejor_combinacion_mes = {
                                            ida: aero_list[comb_ida].anos[ano].meses[mes].mejor_precio.ida,
                                            vuelta: aero_list[comb_vuelta].anos[ano_vuelta].meses[mes_vuelta].mejor_precio.ida,
                                            precio:  precio_combinacion,
                                            dias: dias_meses,
                                            alerta: alerta
                                        }
                                    }
                                }
                            } while (count_meses <= 2); 
                        });
                    }
                }
                mejor_combinacion[comb].mejor_precio.ida_vuelta = mejor_combinacion_mes;
            }


            if(mejor_combinacion[comb].mejor_precio.ida_vuelta.alerta){
                new_alerta = true;
                consoleViewAction('src/utils/algoritmo.js', 'mejorCombinacion', `alerta mejor precio combinacion [${comb}] [IDA_VUELTA]`);
            }

            aero_list_old[comb] = mejor_combinacion[comb];
        }
    
        return {list: aero_list_old, new_alerta: new_alerta};

    } catch (error) {
        consoleViewError('src/utils/algoritmo.js', 'mejorCombinacion', `Error: ${error}`);
        return {error: true}
    }
    
}

function dias_entre_fechas(ida = new Date(), vuelta = new Date()){
    const ms_entre_fechas = vuelta.getTime() - ida.getTime();

    if(ms_entre_fechas < 0){
        return -1;
    }
    else{
        return parseInt(ms_entre_fechas / (1000*60*60*24));  // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
    }
}



function calcularPromedio(array){
    var sumatoria = 0;
    array.forEach(element => {
        sumatoria += element
    });

    return parseInt(sumatoria / array.length);
}

export {algoritmoPasaje, alertaMejorPrecio, mejorCombinacion};


/*
var aero_list = {
        "USH-COR":{
            {"2023": {"mayo": [{"dia":"1","precio":48598,"etiqueta":null},{"dia":"2","precio":36570,"etiqueta":null}]}}
        },
        "COR-USH":{
        }
    };
    .findIndex(checkAge)
*/