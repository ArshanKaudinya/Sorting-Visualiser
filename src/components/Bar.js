import React, { useState, useEffect } from 'react';
import './css/Bar.css'

const Bar = ({ height, idx }) => {
    return (
      <div
        id={`bar-${idx}`}
        className="bar"
        style={{
          height: `${height}px`
        }}
      ></div>
    );
};

export default Bar;
