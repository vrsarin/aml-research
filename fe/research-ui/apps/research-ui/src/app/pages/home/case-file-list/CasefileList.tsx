import styles from './CasefileList.module.css';

/* eslint-disable-next-line */
export interface CasefileListProps {}

export function CasefileList(props: CasefileListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CasefileList!</h1>
    </div>
  );
}

export default CasefileList;
