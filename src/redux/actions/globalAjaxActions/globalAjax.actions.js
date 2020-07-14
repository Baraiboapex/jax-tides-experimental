import {
    SET_API_START_AND_END_DATES,
    FETCH_API_DATA,
    READD_TRANSFORMED_DATA_ARRAY
} from "./types";

export const setApiStartAndEndDates = dates => ({
    type:SET_API_START_AND_END_DATES,
    payload:dates
});

export const reAddTransformedDataArray = data => ({
    type:READD_TRANSFORMED_DATA_ARRAY,
    payload:data
});

export const fetchApiData = ({dataToFetch, dataUrls, abortController, pageToGetDataFor, callBacks}) => dispatch => {
        const getAllRequests = dataUrls.map(
            url => fetch(url,{signal:abortController.signal}).then(res => {
                if(res.ok){
                    return res.json();
                }else{
                    return Promise.reject({
                        status:res.status,
                        error:res.statusText
                    })
                }
            })
        );
        
        return Promise.all(getAllRequests)
            .then(fetchedData => {
                dispatch({
                    type:FETCH_API_DATA,
                    payload:{
                        station:fetchedData[0].stations[0],
                        data:fetchedData[1][dataToFetch],
                        currentPage:pageToGetDataFor
                    }
                });

                return Promise.resolve(fetchedData[1][dataToFetch]);
            })
        
    }

