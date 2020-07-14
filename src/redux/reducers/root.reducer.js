import {combineReducers} from "redux";

import {dates, tideStationData} from "./ajaxReducers/globalAjax.reducer";

export default combineReducers({
    tideStationData,
    dates
});