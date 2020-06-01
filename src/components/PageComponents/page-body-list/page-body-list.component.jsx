import React from 'react';

//import PageListFilter from '../page-list-filter/page-list-filter-component';

//import PageBodyListItem from '../page-body-list-item/page-body-list-item.component';

import './page-body-list.styles.scss';

import { NOAAFilteredDataTranslator } from '../../../utils/noaa-data-translator';

class PageBodyList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fieldFilter:[]
        };
    }

    //Wire this up later.
    handleFieldFilterChange = (e) => {

    }
    
    render(){
        const {fieldFilter} = this.state;
        const {dataType, filterItems} = this.props;

        const hasFilter = fieldFilter.length > 0 ? fieldFilter : Object.keys(filterItems());

        const dataTranslator = NOAAFilteredDataTranslator(hasFilter, dataType);

        return(
            <div className="p-2 rounded page-list container-fluid">
                {this.props.data.map(item => this.props.listItem(item, dataTranslator))}
            </div>
        );
    }
}


export default PageBodyList;