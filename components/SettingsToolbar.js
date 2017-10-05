import { Component } from 'react';
import { Droplet } from 'react-feather';
import Toolbar from './Toolbar';
import ToolbarButton from './ToolbarButton';

export default class SettingsToolbar extends Component {
  render() {
    return (
      <Toolbar>
        <ToolbarButton>
          <Droplet style={{verticalAlign: 'middle'}} />
        </ToolbarButton>
      </Toolbar>
    )
  }
}