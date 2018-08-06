import React from 'react';
import PropTypes from 'prop-types';

const MouseHide = ({ mouseIdle, children }) => (
  <div className={mouseIdle ? 'hide-mouse' : ''}>
    {children}
    <style jsx>{`
      .hide-mouse {
        cursor: none;
      }
    `}</style>
  </div>
);

MouseHide.propTypes = {
  mouseIdle: PropTypes.bool,
  children: PropTypes.node,
};

MouseHide.defaultProps = {
  mouseIdle: false,
  children: undefined,
};

export default MouseHide;
