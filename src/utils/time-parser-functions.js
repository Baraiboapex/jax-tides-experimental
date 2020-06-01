import moment from 'moment';

//Time parser for normal time. For example: 00:00 is 12:00 a.m. and 23:00 is 11:00 p.m. 
export function parseNormalTime(time, clockOnly){
    const date = time.toString().slice(0,11);
    time = time.toString().slice(11,time.length).match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return (clockOnly !== "clock_only" ?  date + ' ' + time.join ('') : time.join('')); // return adjusted time or original string
}

//TO LONG!!!!! REFACTOR THIS LATER TODAY!!!!
export function getCurrentTime(returnType){
  let toReturn = "";

  const today = new Date();

  const full = today.getFullYear().toString() + "-" + 
  (today.getMonth()+1 > 10 ? (today.getMonth()+1).toString() : "0"+(today.getMonth()+1).toString()) + "-" + 
  (today.getDate() > 10 ? (today.getDate()).toString() : "0"+(today.getDate()).toString() ) + " " +
  (today.getHours() > 10 ? today.getHours().toString() : "0"+today.getHours().toString()) + ":" + 
  (today.getMinutes() > 10 ? today.getMinutes().toString() : "0"+today.getMinutes().toString());

  const forApi = today.getFullYear().toString() + 
  (today.getMonth()+1 > 10 ? (today.getMonth()+1).toString() : "0"+(today.getMonth()+1).toString()) +  
  (today.getDate() > 10 ? (today.getDate()).toString() : "0"+(today.getDate()).toString() );

  const forApiWithTime = today.getFullYear().toString() + 
  (today.getMonth()+1 > 10 ? (today.getMonth()+1).toString() : "0"+(today.getMonth()+1).toString()) + 
  (today.getDate() > 10 ? (today.getDate()).toString() : "0"+(today.getDate()).toString() ) + " " +
  (today.getHours() > 10 ? today.getHours().toString() : "0"+today.getHours().toString())+ ":" + 
  (today.getMinutes() > 10 ? today.getMinutes().toString() : "0"+today.getMinutes().toString());

  const currentTime24h = (today.getHours() > 10 ? today.getHours().toString() : "0"+today.getHours().toString())+ ":" + 
  (today.getMinutes() > 10 ? today.getMinutes().toString() : "0"+today.getMinutes().toString());

  switch(returnType){
    case "get_full_date":
      toReturn = full 
      break;
    case "get_api_time":
      toReturn = forApi
      break;
    case "get_api_date_with_time":
      toReturn = forApiWithTime
      break;
    case "current_time_24h":
      toReturn = currentTime24h;
      break;
    default:
      toReturn = "No Type Specified"
      break;
  }

  return toReturn;
}

export function latestTime(arr){
  const nextTime = arr.map(time => time.t.replace(/-/gi,'/'))
  .map(s => moment(s, "YYYY/MM/DD HH:mm"))
  .sort(m=>m.valueOf())
  .find(m=>m.isAfter());

  //NOTE THIS IS A TEMPORARY FIX! REMOVE THIS LATER!!
  const whatToReturn = (nextTime !== undefined ? 
    arr.filter(item => item.t.replace(/-/gi,'/') === nextTime._i)[0] 
    :
    arr.filter(item => item.t ===  moment(arr[3].t, "YYYY/MM/DD HH:mm")._i)[0]
  );

  return whatToReturn;
}
