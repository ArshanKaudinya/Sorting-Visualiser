import React from 'react';

const Bar = ({ height, idx }) => {
    return (
        <div
            id={`bar-${idx}`}
            style={{
                height: `${height}px`,
                backgroundColor: '#ff9a55', // Default color
                width: '8px', // Example width
                margin: '0 1px', // Example margin
                display: 'inline-block',
                transition: '0.05s ease',
            }}
        ></div>
    );
};

export default Bar;
