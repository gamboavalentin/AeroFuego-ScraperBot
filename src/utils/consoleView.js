import { console_log, console_error } from "../api/discord.js";

function consoleViewAction(src, func, action){
  const hoy = new Date();
  console_log('ACTION', src, action);
  console.log(`[${hoy.toLocaleString()}] [ACTION] => ${src} => ${func} => ${action}`);
}

function consoleViewError(src, func, err){
  const hoy = new Date();
  console.log(`[${hoy.toLocaleString()}] [ERROR] => ${src} => ${func} => ${err}`);
  //Discord
  console_log('ERROR', src, err);
  console_error(src, err);
}
export { consoleViewAction, consoleViewError}