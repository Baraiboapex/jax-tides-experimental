import React from 'react';

import { NOAAFilteredDataTranslator } from '../../utils/noaa-data-translator';
import { latestTime } from '../../utils/time-parser-functions';

const WithData = WrappedComponent => {
    class WithData extends React.Component {
        state={
            station:{},
            data:[],
            loadingStatus:0
        }
    
        abortFetch = new AbortController();
    
        componentDidMount(){
            this.getData();
            window.setInterval(()=>{
                this.getData();
            },300000);
        }
    
        getData = () => {
            const{dataUrls} = this.props;
            const getAllRequests = dataUrls.map(
                url => fetch(url,{signal:this.abortFetch.signal}).then(res => {
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
            Promise.all(getAllRequests)
            .then(stationAndTides => {
                return this.setState(
                    {
                        station:stationAndTides[0].stations[0], 
                        data:stationAndTides[1][this.props.dataToFetch]
                    }
                    ,()=>{
                        console.log(stationAndTides[1]);
                        this.getLatestDataTime();
                        this.sortDataByTime();
                    }
                )
            })
            .catch(error => {
                if(error.name === "AbortError") return
                console.log(error)
            });
        }    
    
        pageDataFilter = () => {
            const{dataFilterValues, dataFilterType}=this.props;
            if(dataFilterValues && dataFilterType){
                return NOAAFilteredDataTranslator(dataFilterValues,dataFilterType);
            }
            return;
        }
        
        getLatestDataTime = () => {
            if(this.state.data.length > 1){
                const {data} = this.state;
                return this.setState({latestDataTime: latestTime(data)});
            }
            return null;
        }

        sortDataByTime = () => {
            const currData = [...this.state.data];
            const newSortedData = currData.slice().sort((curr,prev) => new Date(curr.t) > new Date(prev.t) ? -1 : 1);
            this.setState({
                 data:newSortedData
            });
        }
        
        componentWillUnmount(){
            this.abortFetch.abort();
        }

        render(){
            const {data, station, latestDataTime} = this.state;
            return (
                <WrappedComponent 
                    data={data} 
                    station={station} 
                    filter={this.pageDataFilter} 
                    latestDataTime={latestDataTime}
                />
            );
        }
    }
    return WithData;
} 



export default WithData;