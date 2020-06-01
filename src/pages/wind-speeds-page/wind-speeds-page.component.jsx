import React from 'react';

import PageDataLoadingCard from '../../components/PageComponents/page-data-loading-card/page-data-loading-card.component';
import PageNoDataMessage from '../../components/PageComponents/page-no-data-message/page-no-data-message.component';
import PageContainer from '../../components/PageComponents/page-container/page-container.component';
import PageBodyButtonGroup from '../../components/PageComponents/page-body-btn-group/page-body-btn-group.component';
import PageBodyList from '../../components/PageComponents/page-body-list/page-body-list.component';
import { PageBodyListItem } from '../../components/PageComponents/page-body-list-item/page-body-list-item.component';
import { PageBodyTopCardJumbotron } from '../../components/PageComponents/page-body-top-jumbotron/page-body-top-jumbotron-card.component';

import './wind-speeds-page.styles.scss';

import { NOAAFilteredDataTranslator, NOAATranslateDataValue } from '../../utils/noaa-data-translator';
import { parseNormalTime, getCurrentTime } from '../../utils/time-parser-functions';

class WindPage extends React.Component{
    constructor(){
        super();
        this.state={
            station:{},
            windSpeeds:[],
            speedType:"mph"
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
            `https://tidesandcurrents.noaa.gov/api/datagetter?&station=8720218&date=latest&units=english&datum=MLLW&product=wind&time_zone=LST_LDT&format=json&interval=`
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
        .then(stationAndWinds => this.setState(
                {
                    station:stationAndWinds[0].stations[0], 
                    windSpeeds:stationAndWinds[1].data
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
        const currWinds = [...this.state.windSpeeds];
        const newWindSpeedsData = currWinds.slice().sort((curr,prev) => new Date(curr.t) > new Date(prev.t) ? -1 : 1);
        this.setState({
             windSpeeds:newWindSpeedsData
        });
    }

    updateKtsOrMph = (e) => this.setState({speedType:e.currentTarget.value})

    showKtsOrMph = (speedType, val) =>{
        const {windSpeeds} = this.state;
        return (windSpeeds.length > 0 ?  
             (speedType === "mph" ? 
                (windSpeeds.length > 0 ? NOAATranslateDataValue(val, windSpeeds[0][val],"WindData")  : "")
                :
                (windSpeeds.length > 0 ? windSpeeds[0][val]+" kts" : "")
             )
             : 
             ""
        )
    }

    btnGroupArray=()=>[
        {
            label:"mph",
            action:this.updateKtsOrMph,
            inVal:"mph"
        },{
            label:"kts",
            action:this.updateKtsOrMph,
            inVal:"kts"
        }
    ];

    pageDataFilter = () => NOAAFilteredDataTranslator(["t","s","d","dr","g","f"],"TideData"); 

    componentWillUnmount(){
        this.abortFetch.abort();
    }

    render(){
        const { station, windSpeeds, speedType} = this.state;
        
        const pageBody1 = (
            <React.Fragment>
                <PageBodyTopCardJumbotron
                    customClasses="text-white mb-4" 
                    title={(station ? station.name : "")}
                >
                    <h5>Wind Speeds:</h5>
                    <PageBodyButtonGroup btns={this.btnGroupArray()}/>
                    <br/>
                    <br/>
                    <h2 className="display-4"><strong>{this.showKtsOrMph(speedType,"s")}</strong></h2>
                    <br/>
                    <hr className="bg-light"/>
                    <br/>
                    <h5>Gust Speed : <strong>{this.showKtsOrMph(speedType,"g")}</strong></h5>
                </PageBodyTopCardJumbotron>
            </React.Fragment>
        );

        return (
            <div className="page-top d-flex container-fluid p-0">
                {windSpeeds.length > 0 ? (
                    <PageContainer pageBody={pageBody1}/>
                ) : (
                    <PageDataLoadingCard dataType="Wind Speeds"/>
                )}
            </div>
        );
    }
}

export default WindPage;