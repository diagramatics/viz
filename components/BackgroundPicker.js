import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droplet } from 'react-feather';
import { SketchPicker } from 'react-color';
import ToolbarButton from './ToolbarButton';

export default class BackgroundPicker extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => undefined,
    onToggle: () => undefined,
  };

  state = {
    active: false,
  };

  handleClick = () => {
    const { onToggle } = this.props;
    const { active } = this.state;
    this.setState({
      active: !active,
    });

    onToggle(!active);
  };

  handleChange = color => {
    const { onChange } = this.props;
    onChange(color);
  };

  render() {
    const { background } = this.props;
    const { active } = this.state;

    return (
      <div className="container">
        <ToolbarButton onClick={this.handleClick}>
          <Droplet style={{ verticalAlign: 'middle' }} />
        </ToolbarButton>
        {active && (
          <div className="picker">
            <SketchPicker color={background} onChange={this.handleChange} />
          </div>
        )}
        <style jsx>{`
          .container {
            position: relative;
          }

          .picker {
            position: absolute;
            bottom: 100%;
            right: 0;
          }
        `}</style>
      </div>
    );
  }
}
