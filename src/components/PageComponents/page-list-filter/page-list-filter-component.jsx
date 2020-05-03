import React from 'react';

//NOTE: in order for this concept to work, the fields for the filter will need to be more explicit 
//after they are copied from the raw JSON data brough back from the server. I will need to find a way to name
//these fields more explicitly later, or, find another way of making the filter to work so that it can
//work with the abiguous raw json fields. 
//==============================================================================================
//SOLUTION: split the different charts and data up into separate react-route pages.

import CheckBoxComponent from '../../InteractiveElements/check-box-component/check-box-component.component';

import './page-list-filter.styles.scss';

const PageListFilter = ({filterChoices, handleFieldFilterChange}) => (
    <div className="form">
        {Object.keys(filterChoices).map(choiceKey => (
            <div className="form-check form-check-inline">
                <CheckBoxComponent
                    event={handleFieldFilterChange}
                    name={choiceKey}
                    value={filterChoices[choiceKey]}
                />
            </div>
        ))}
    </div>
);

export default PageListFilter;