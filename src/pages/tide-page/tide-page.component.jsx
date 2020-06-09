import React from 'react';

import PageDataLoadingCard from '../../components/PageComponents/page-data-loading-card/page-data-loading-card.component';
//import PageNoDataMessage from '../../components/PageComponents/page-no-data-message/page-no-data-message.component';
import PageContainer from '../../components/PageComponents/page-container/page-container.component';
import PageBodyList from '../../components/PageComponents/page-body-list/page-body-list.component';
import { PageBodyListItem } from '../../components/PageComponents/page-body-list-item/page-body-list-item.component';
import { PageBodyTopCardJumbotron } from '../../components/PageComponents/page-body-top-jumbotron/page-body-top-jumbotron-card.component';

import './tide-page.styles.scss';

import { NOAAFilteredDataTranslator, NOAATranslateDataValue } from '../../utils/noaa-data-translator';
import { parseNormalTime, latestTime, getFullDateForAPI } from '../../utils/time-parser-functions';

class TidePage extends React.Component{
    constructor(){
        super();
        this.state={
            station:{},
            tides:[],
            loadStatus:0
        };
    }

    abortFetch = new AbortController();

    componentDidMount(){
        this.getData();
        window.setInterval(()=>{
            this.getData();
        },300000);
    }

    getData = () => {
        const urls = [
            'https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/stations/8720218.json?type=tidepredictions&units=english',
            `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&begin_date=${getFullDateForAPI()}&end_date=${getFullDateForAPI()}&datum=MLLW&station=8720218&time_zone=lst_ldt&units=english&interval=hilo&format=json&application=NOS.COOPS.TAC.TidePred`
        ];
        const getAllRequests = urls.map(
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
        .then(stationAndTides => this.setState(
                {
                    station:stationAndTides[0].stations[0], 
                    tides:stationAndTides[1].predictions
                }
                ,()=>{
                    this.getNextTideTime();
                    this.sortDataByTime();
                }
            )
        )
        .catch(error => {
            if(error.name === "AbortError") return
            console.error(error)
        });
    }

    sortDataByTime = () => {
        const currTides = [...this.state.tides];
        const newTidesData = currTides.slice().sort(
            (curr,prev) => new Date(curr.t) > new Date(prev.t) ? -1 : 1
        );
        this.setState({
            tides:newTidesData
        });
    }

    pageDataFilter = () => NOAAFilteredDataTranslator(["t","v","type"],"TideData"); 

    getNextTideTime = () => {
        if(this.state.tides.length > 1){
            const {tides} = this.state;  
            return this.setState({nextTide: latestTime(tides)});
        }
        return null;
    }

    componentWillUnmount(){
        this.abortFetch.abort();
    }

    render(){
        const { station, tides, nextTide } = this.state;
        console.log("Render!!");
        const listItem = (item, dataFilter) => (
            <PageBodyListItem 
                key={item.t} 
                item={item} 
                dataType="TideData" 
                dataTranslator={dataFilter}
                customClasses={"border-bottom border-light"}
            />
        );

        const pageBody1 = (
            <React.Fragment>
                <PageBodyTopCardJumbotron
                    customClasses="text-white mb-4" 
                    title={(station ? station.name : "")}
                >
                    <h6>Next Tide At:</h6>
                    <br/>
                    <h3 className="display-4"><strong>{(nextTide ? parseNormalTime(nextTide.t, "clock_only")  : "")}</strong></h3>
                    <br/>
                    <hr className="bg-light"/>
                    <br/>
                    <h6> Tide Height : <strong>{(nextTide ? NOAATranslateDataValue("type", nextTide.type, "TideData") : "")}</strong> </h6>
                </PageBodyTopCardJumbotron>
                <PageBodyList 
                    data={tides} 
                    listItem={listItem} 
                    dataType="TideData"
                    filterItems={this.pageDataFilter}
                />
                <br/>
            </React.Fragment>
        );

        return (
            <div className="page-top d-flex container-fluid p-0">
                {tides.length > 0 ? (
                    <PageContainer pageBody={pageBody1}/>
                ) : (
                    <PageDataLoadingCard dataType="Tides"/>
                )}
            </div>
        );
    }
}

export default TidePage;