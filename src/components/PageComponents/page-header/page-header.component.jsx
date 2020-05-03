import React from 'react';

import './page-header.styles.scss';

const PageHeader = ({stationName, lat, long}) => (
    <div className="d-flex justify-content-between flex-row bg-primary position-fixed w-100 text-light p-2 shadow">
        <div className="d-flex align-items-center">
            <h4>{stationName}</h4>
        </div>
        <div className="d-flex align-items-center">
            <h5 className="m-0">
                <strong>Lat:</strong>{lat} &nbsp; <strong>Long:</strong>{long}
            </h5>
        </div>
    </div>
);

export default PageHeader;