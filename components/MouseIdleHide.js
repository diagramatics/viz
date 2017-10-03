import React, { Component } from 'react';

export default class MouseIdleHide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouse: false,
    };
  }

  static defaultProps = {
    timeout: 3000,
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
    return (
      <div className={!this.state.mouse ? 'hide-mouse' : ''}>
        {this.props.children}
        <style jsx>{`
          .hide-mouse {
            cursor: none;
          }
        `}</style>
      </div>
    );
  }
}
