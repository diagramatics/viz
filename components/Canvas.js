import React from 'react';

export default ({ children, width, height }) => (
  <svg className="canvas" width={width} height={height}>
    {children}
    <style jsx>{`
      .canvas {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    `}</style>
  </svg>
);
