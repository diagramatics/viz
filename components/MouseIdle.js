import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MouseIdle extends Component {
  static propTypes = {
    timeout: PropTypes.number,
    Idle: PropTypes.node.isRequired,
    active: PropTypes.bool,
  };

  static defaultProps = {
    timeout: 5000,
    active: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      mouse: false,
    };
  }

  componentDidMount() {
    const { timeout } = this.props;
    document.addEventListener('mousemove', () => {
      this.setState({
        mouse: true,
      });

      this.timer = setTimeout(() => {
        this.setState({
          mouse: false,
        });

        this.timer = null;
      }, timeout);
    });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { Idle, active, ...props } = this.props;
    const { mouse } = this.state;
    return <Idle mouseIdle={active ? !mouse : false} {...props} />;
  }
}
