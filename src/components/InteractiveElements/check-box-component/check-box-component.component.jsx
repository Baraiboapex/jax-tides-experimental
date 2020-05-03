import React from 'react';

import './check-box-component.styles.scss';

const CheckBoxComponent = ({event, name, value, id, customClasses}) => (
    <React.Fragment>
        {id ? (
            <input 
                id={id}
                className={"form-check-input " + customClasses ? customClasses : ""} 
                onClick={event} 
                type="checkbox" 
                name={name} 
                value={value}
            />
        ) : (
            <input
                className={"form-check-input " + customClasses ? customClasses : ""}  
                onClick={event} 
                type="checkbox" 
                name={name} 
                value={value}
            />
        )}
        <label className="form-check-label" for={name}>{name}</label>
    </React.Fragment>
);

export default CheckBoxComponent;
