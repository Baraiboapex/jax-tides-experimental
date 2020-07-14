import {SET_API_START_AND_END_DATES, FETCH_API_DATA, READD_TRANSFORMED_DATA_ARRAY} from "../../actions/globalAjaxActions/types"; //../../actions/globalAjaxActions/types
import { getFullDateForAPI } from '../../../utils/time-parser-functions';

const INITIAL_DATES = {
    startDate:getFullDateForAPI(),
    endDate:getFullDateForAPI()
};

const INITIAL_DATA_STATE = {
    station:{},
    data:[],
    currentPage:""
}

export const dates = (state = INITIAL_DATES, action) => {
    switch(action.type){
        case SET_API_START_AND_END_DATES:
            return {
                ...action.payload,
            }
        default:
            return state;
    }
}

export const tideStationData = (state = INITIAL_DATA_STATE, action) => {
    switch(action.type){
        case READD_TRANSFORMED_DATA_ARRAY:
            return {
                ...state,
                data:[...action.payload]
            };
        case FETCH_API_DATA:
            return action.payload;
        default:
           return state;
    }
}
