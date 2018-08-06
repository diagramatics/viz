import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import BackgroundPicker from './BackgroundPicker';

class SettingsToolbar extends Component {
  static propTypes = {
    setBackground: PropTypes.func.isRequired,
    mouseIdle: PropTypes.bool.isRequired,
    background: PropTypes.string.isRequired,
  };

  state = {
    isPickerActive: false,
  };

  handleChange = color => {
    const { setBackground } = this.props;
    setBackground(color.hex);
  };

  handleToggle = active => {
    this.setState({
      isPickerActive: active,
    });
  };

  render() {
    const { mouseIdle, background } = this.props;
    const { isPickerActive } = this.state;
    return (
      <Toolbar active={!mouseIdle || isPickerActive}>
        <BackgroundPicker
          background={background}
          onToggle={this.handleToggle}
          onChange={this.handleChange}
        />
      </Toolbar>
    );
  }
}

export default connect(
  ({ background }) => ({
    background,
  }),
  {
    setBackground: color => ({
      type: 'SET_BACKGROUND',
      value: color,
    }),
  },
)(SettingsToolbar);
