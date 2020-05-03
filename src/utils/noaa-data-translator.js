import NOAADataKey from './noaa-data-key';

export function NOAADataTranslator(objKeyToTranslate, dataProduct){
    return NOAADataKey[dataProduct]["values"][objKeyToTranslate];
}

export function NOAAFilteredDataTranslator(data, dataProduct){
    const selectedDataToFilter = NOAADataKey[dataProduct]["values"];
    const filter = Object.keys(selectedDataToFilter)
                    .filter(key => data.includes(key))
                    .reduce((obj,key) => {
                        obj[key] = selectedDataToFilter[key]
                        return obj;
                    },{});
    return filter;
}