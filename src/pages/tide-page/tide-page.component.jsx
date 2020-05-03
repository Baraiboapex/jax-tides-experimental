import React from 'react';

import PageNoDataMessage from '../../components/PageComponents/page-no-data-message/page-no-data-message.component';
import PageContainer from '../../components/PageComponents/page-container/page-container.component';
import PageBodyList from '../../components/PageComponents/page-body-list/page-body-list.component';
import { PageBodyListItem } from '../../components/PageComponents/page-body-list-item/page-body-list-item.component';

import './tide-page.styles.scss';

import {NOAAFilteredDataTranslator} from '../../utils/noaa-data-translator';

class TidePage extends React.Component{
    constructor(){
        super();
        this.state={
            tides:{}
        };
    }

    componentDidMount(){
        this.getTideData();
        window.setInterval(()=>this.getTideData(),300000);
    }

    getTideData = () => {
        fetch('https://tidesandcurrents.noaa.gov/api/datagetter?&datum=MTL&product=water_level&units=english&date=today&time_zone=gmt&station=8720218&format=json')
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                return Promise.reject({
                    status:response.status,
                    error:response.statusText
                });
            }
        })
        .then(tides => this.setState({tides:tides}))
        .catch(error => console.error(error));
    }

    pageFilter = () => NOAAFilteredDataTranslator(["t","v","q"],"TideData"); 

    render(){
        const { metadata, data } = this.state.tides;

        const listItem = (item, dataFilter) => (
            <PageBodyListItem 
                key={item.t} 
                item={item} 
                dataType="TideData" 
                dataTranslator={dataFilter}
            />
        );

        const pageBody1 = ( 
            <PageBodyList 
                data={data} 
                listItem={listItem} 
                dataType="TideData"
                filterItems={this.pageFilter}
            />
        );
        // {/*<PageContainer data={data} metadata={metadata} pageBody={pageBody1}/>*/}
        return (
            <div className="page-top d-flex container-fluid bg-dark p-0">
                {data ? (
                    <PageContainer data={data} metadata={metadata} pageBody={pageBody1}/>
                ) : (
                    <PageNoDataMessage dataType="Tides"/>
                )}
            </div>
        );
    }
}

export default TidePage;