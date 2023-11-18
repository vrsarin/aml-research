import { Component } from 'react';

import styles from './NodeDrawer.module.css';

/* eslint-disable-next-line */
export interface NodeDrawerProps {}

export class NodeDrawer extends Component<NodeDrawerProps> {
  override render() {
    return (
      <div className={styles['container']}>
        <p>Welcome to NodeDrawer!</p>
      </div>
    );
  }
}

export default NodeDrawer;
