export function updateComponentOrReduxStateBatch(methods, data){
    let newReduxStateValues = [];
    
    for(let i = 0; i <= methods.length-1; i++){
        if(methods[i]["reduxUpdater"]){
            newReduxStateValues = methods[i].reduxUpdater(data);
            return newReduxStateValues;
        }else if(methods[i]["stateUpdater"]){
            methods[i].updater(data,methods[i].stateUpdater);
        }else if(methods[i]["inderectReduxUpdater"]) {
            methods[i].inderectReduxUpdater(data);
        }
    }
}

