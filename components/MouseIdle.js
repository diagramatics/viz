import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MouseIdle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouse: false,
    };
  }

  static defaultProps = {
    timeout: 3000,
    Idle: PropTypes.instanceOf(Component),
  }

  componentDidMount() {
    document.addEventListener('mousemove', () => {
      this.setState({
        mouse: true,
      });

      this.timer = setTimeout(() => {
        this.setState({
          mouse: false,
        });

        this.timer = null;
      }, this.props.timeout);
    });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { Idle, ...props } = this.props;
    const { mouse } = this.state;
    return <Idle mouseIdle={!mouse} {...props} />
  }
}