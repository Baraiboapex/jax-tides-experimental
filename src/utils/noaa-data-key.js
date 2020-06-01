
import { parseNormalTime } from './time-parser-functions';

const NOAADataKey = {
    TideData:{
        values:{
            t:'Time Recorded',
            v:'Water Height',
            type:"Tide Level;"
        },
        valueTranslator:{
            t:(time)=>parseNormalTime(time),
            type:{
                H:'High',
                L:'Low',
            },
        }
    },
    TempData:{
        values:{
            t:"Time Recorded",
            v:"Water Temperature",
            f:"Data Flags"
        },
        valueTranslator:{
            t:(time)=>parseNormalTime(time),
            v:(temp)=> ((Math.round((temp - 32) * 5 / 9) * 10) / 10).toString() + " °C" 
        }
    },
    WindData:{
        values:{
            t:"Time Recorded",
            s:"Wind Speed",
            d:"Wind Direction In Degrees",
            dr:"Wind Direction",
            g:"Wind Gust Speed",
            f:"Data Flags"
        },
        valueTranslator:{
            t:(time)=>parseNormalTime(time),
            s:(speed)=> (Math.ceil((parseFloat(speed) / 0.86898)*10) / 10).toString() + " mph",
            g:(gust)=> (Math.ceil((parseFloat(gust) / 0.86898)*10) / 10).toString() + " mph" 
        }
    }
}

export default NOAADataKey