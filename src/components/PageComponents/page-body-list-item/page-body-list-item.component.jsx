import React from 'react'

import './page-body-list-item.style.scss'

import {NOAADataTranslator, NOAATranslateDataValue} from '../../../utils/noaa-data-translator';

export const PageBodyListItem = ({item, dataType, dataTranslator}) =>(
    <div className="d-flex justify-content-center flex-row m-2 bg-secondary">
        {Object.keys(item).map(key => {
            if(key in dataTranslator){
                return (
                    <div key={key} className="flex-column text-light p-2 d-flex justify-content-center text-center">
                        <div>
                            <strong>{NOAADataTranslator(key, dataType)}</strong>
                        </div>
                        <span>{NOAATranslateDataValue(key,item[key],dataType)}</span>
                    </div>
                );
            }
            return null;
        })}
    </div>
);