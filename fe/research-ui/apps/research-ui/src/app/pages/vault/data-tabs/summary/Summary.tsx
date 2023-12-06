import styles from './Summary.module.css';

/* eslint-disable-next-line */
export interface SummaryProps {}

export function Summary(props: SummaryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Summary!</h1>
    </div>
  );
}

export default Summary;
