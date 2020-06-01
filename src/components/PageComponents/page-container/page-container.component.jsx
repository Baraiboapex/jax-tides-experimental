import React from 'react';

import './page-container.styles.scss';

const PageContainer = ({pageBody}) => (
    <div className="container p-0">
        {pageBody}
    </div>
);

export default PageContainer;