import React from 'react'

import './page-body-list-item.style.scss'

import {NOAADataTranslator, NOAATranslateDataValue} from '../../../utils/noaa-data-translator';

export const PageBodyListItem = ({item, dataType, dataTranslator, customClasses}) =>(
    <div className={"d-flex justify-content-center flex-row m-2 " + (customClasses)}>
        {Object.keys(item).map(key => {
            if(key in dataTranslator){
                return (
                    <div key={key} className="flex-column text-light pl-4 pr-4 pt-2 pb-2 d-flex justify-content-center text-center ">
                        <div>
                            <h6><strong>{NOAADataTranslator(key, dataType)}</strong></h6>
                        </div>
                        <span>{NOAATranslateDataValue(key, item[key], dataType)}</span>
                    </div>
                );
            }
            return null;
        })}
    </div>
);