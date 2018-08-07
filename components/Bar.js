import React from 'react';
import PropTypes from 'prop-types';

const Bar = ({ x, width, height }) => (
  <rect
    x={x}
    width={width}
    height="1"
    style={{
      transform: `scaleY(${height}) translateZ(0)`,
    }}
    className="frequency-bar"
  >
    <style jsx>{`
      .frequency-bar {
        fill: rgba(248, 249, 250, 0.8);
      }
    `}</style>
  </rect>
);

Bar.propTypes = {
  x: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Bar;
