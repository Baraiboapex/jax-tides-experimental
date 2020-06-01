import React from 'react';

import PageDataLoadingCard from '../../components/PageComponents/page-data-loading-card/page-data-loading-card.component';
import PageNoDataMessage from '../../components/PageComponents/page-no-data-message/page-no-data-message.component';
import PageContainer from '../../components/PageComponents/page-container/page-container.component';
import PageBodyButtonGroup from '../../components/PageComponents/page-body-btn-group/page-body-btn-group.component';
import PageBodyList from '../../components/PageComponents/page-body-list/page-body-list.component';
import { PageBodyListItem } from '../../components/PageComponents/page-body-list-item/page-body-list-item.component';
import { PageBodyTopCardJumbotron } from '../../components/PageComponents/page-body-top-jumbotron/page-body-top-jumbotron-card.component';

import './water-temp-page.styles.scss';

import { NOAAFilteredDataTranslator, NOAATranslateDataValue } from '../../utils/noaa-data-translator';
import { parseNormalTime, getCurrentTime } from '../../utils/time-parser-functions';

class WaterTempPage extends React.Component{
    constructor(){
        super();
        this.state={
            station:{},
            waterTemp:[],
            tempUnit:"farenheight"
        };
    }

    abortFetch = new AbortController();

    componentDidMount(){
        this.getData();
        window.setInterval(()=>{
            this.getData();
        },12000);
    }

    getData = () => {
        const urls = [
            'https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/stations/8720218.json?type=tidepredictions&units=english',
            `https://tidesandcurrents.noaa.gov/api/datagetter?&station=8720218&date=latest&units=english&datum=MLLW&product=water_temperature&time_zone=LST_LDT&format=json&application=NOS.COOPS.TAC.COOPSMAP&interval=`
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
        .then(stationAndTemp => this.setState(
                {
                    station:stationAndTemp[0].stations[0], 
                    waterTemp:stationAndTemp[1].data
                }
                ,()=>{
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
        const currWaterTemp = [...this.state.waterTemp];
        const newWaterTempData = currWaterTemp.slice().sort((curr,prev) => new Date(curr.t) > new Date(prev.t) ? -1 : 1);
        this.setState({
             windSpeeds:newWaterTempData
        });
    }

    updateCelOrFar = (e) => this.setState({tempUnit:e.currentTarget.value})

    showCelOrFar = (tempUnit, val) =>{
        const {waterTemp} = this.state;
        return (waterTemp.length > 0 ?  
             (tempUnit === "celsius" ? 
                (waterTemp.length > 0 ? NOAATranslateDataValue("v", waterTemp[0][val],"TempData")  : "")
                :
                (waterTemp.length > 0 ? waterTemp[0][val]+" °F" : "")
             )
             : 
             ""
        )
    }

    btnGroupArray=()=>[
        {
            label:"°F",
            action:this.updateCelOrFar,
            inVal:"farenheight"
        },
        {
            label:"°C",
            action:this.updateCelOrFar,
            inVal:"celsius"
        }
    ];

    pageDataFilter = () => NOAAFilteredDataTranslator(["t","v","f"],"TempDataData"); 

    componentWillUnmount(){
        this.abortFetch.abort();
    }

    render(){
        const { station, waterTemp, tempUnit} = this.state;
        const pageBody1 = (
            <React.Fragment>
                <PageBodyTopCardJumbotron
                    customClasses="text-white mb-4" 
                    title={(station ? station.name : "")}
                >
                <h5>Water Temperature:</h5>
                <PageBodyButtonGroup btns={this.btnGroupArray()}/>
                <br/>
                <br/>
                <h2 className="display-4"><strong>{this.showCelOrFar(tempUnit,"v")}</strong></h2>
                <br/>
                <hr className="bg-light"/>
                <br/>
                <h5>As Of : <strong>{waterTemp.length > 0 ? parseNormalTime(waterTemp[0].t,"clock_only") : ""}</strong></h5>
                </PageBodyTopCardJumbotron>
            </React.Fragment>
        );

        return (
            <div className="page-top d-flex container-fluid p-0">
                {waterTemp.length > 0 ? (
                    <PageContainer pageBody={pageBody1}/>
                ) : (
                    <PageDataLoadingCard dataType="Water Temperature"/>
                )}
            </div>
        );
    }
}

export default WaterTempPage;