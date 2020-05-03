import React from 'react';

import PageHeader from '../page-header/page-header.component';

import './page-container.styles.scss';

const PageContainer = ({metadata, pageBody}) => (
    <div className="container-fluid p-0">
        <PageHeader
            stationName={metadata.name}
            lat={metadata.lat}
            long={metadata.lon}
        />
        <br/><br/><br/>
        {pageBody}
    </div>
);

export default PageContainer;