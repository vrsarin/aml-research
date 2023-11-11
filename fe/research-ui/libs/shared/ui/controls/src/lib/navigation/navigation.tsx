import { Component } from 'react';

import './navigation.css';
import React from 'react';
import { AppBar } from '@mui/material';

export interface NavigationProps {}

export class Navigation extends Component<NavigationProps> {
  override render() {
    return (
      <div>
        <AppBar position='static'>
        </AppBar>       
      </div>
    );
  }
}

export default Navigation;
