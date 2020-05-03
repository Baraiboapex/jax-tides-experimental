import React from 'react';

const PageNoDataMessage = ({dataType}) => (
    <div className="jumbotron align-self-center jumbotron-fluid w-100 m-3">
        <div className="container">
            <div className="d-flex justify-content-center"> 
                <h1 className="display-4">No Data Found For {dataType}</h1>
            </div>
        </div>
    </div>
);

export default PageNoDataMessage;