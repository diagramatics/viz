import React from 'react';
import PropTypes from 'prop-types';

class WindowMeasure extends React.Component {
  static propTypes = {
    children: PropTypes.func,
  };

  static defaultProps = {
    children: () => undefined,
  };

  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  render() {
    const { children } = this.props;
    const { width, height } = this.state;
    return children({ width, height });
  }
}

export default WindowMeasure;
