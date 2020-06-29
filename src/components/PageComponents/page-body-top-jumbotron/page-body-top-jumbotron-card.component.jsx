import React from 'react';

import './page-body-top-jumbotron-card.styles.scss';

export const PageBodyTopCardJumbotron = ({
    title, 
    customClasses, 
    label, 
    mainData, 
    secondaryDataLabel,
    secondaryData, 
    buttons
}) => (
 <div className="container-fluid">
    <div className={"card text-center top-jt-dark-tran " + customClasses}>
        <div className="card-header text-center">
            <h6>{title}</h6>
        </div>
        <div className="card-body jumbotron text-center top-jt-dark-tran m-0">
            <h6>{label}</h6>
            {buttons ? (
                <React.Fragment>
                    {buttons}
                    <br/>
                    <br/>
                </React.Fragment>
            ) : (
                <br/>
            )}
            <br/>
            <h3 className="display-4"><strong>{mainData}</strong></h3>
            <br/>
            <hr className="bg-light"/>
            <br/>
            <h6> {secondaryDataLabel} : <strong>{secondaryData}</strong></h6>
        </div>
        <div className="card-footer text-center">
            &nbsp;
        </div>
    </div>
 </div>
);