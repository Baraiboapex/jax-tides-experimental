import React from 'react';

import './page-body-top-jumbotron-card.styles.scss';

export const PageBodyTopCardJumbotron = ({title, customClasses, children}) => (
 <div className="container-fluid">
    <div className={"card text-center top-jt-dark-tran " + customClasses}>
        <div className="card-header text-center">
            <h5>{title}</h5>
        </div>
        <div className="card-body jumbotron text-center top-jt-dark-tran m-0">
            {children}
        </div>
        <div className="card-footer text-center">
            &nbsp;
        </div>
    </div>
 </div>
);