import React from 'react';

const PageBodyButtonGroup = ({btns}) => (
    <div className="btn-group" role="group" aria-label="Basic example">
        {btns.map(({action, label, inVal}) => (
            <button key={label} type="button" onClick={action} className="btn btn-dark pt-1 pb-1" value={inVal}>
                {label}
            </button>
        ))}
    </div>
);

export default PageBodyButtonGroup;