import React from 'react';
import PropTypes from 'prop-types';

const Background = ({ width, height, background }) => (
  <rect
    x="0"
    y="0"
    width={width}
    height={height}
    style={{
      fill: background,
    }}
  />
);

Background.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  background: PropTypes.string,
};

Background.defaultProps = {
  background: '#82c91e',
};

export default Background;
