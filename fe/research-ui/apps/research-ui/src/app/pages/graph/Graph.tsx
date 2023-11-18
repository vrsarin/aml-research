import { Component } from 'react';

import styles from './Graph.module.css';

/* eslint-disable-next-line */
export interface GraphProps {}

export class Graph extends Component<GraphProps> {
  override render() {
    return (
      <div className={styles['container']}>
        <p>Welcome to Graph!</p>
      </div>
    );
  }
}

export default Graph;
