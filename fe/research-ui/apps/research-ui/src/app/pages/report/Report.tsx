import { Component } from 'react';

import styles from './Report.module.css';

/* eslint-disable-next-line */
export interface ReportProps {}

export class Report extends Component<ReportProps> {
  override render() {
    return (
      <div className={styles['container']}>
        <p>Welcome to Report!</p>
      </div>
    );
  }
}

export default Report;
