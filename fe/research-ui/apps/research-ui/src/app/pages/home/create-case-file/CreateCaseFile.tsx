import styles from './CreateCaseFile.module.css';

/* eslint-disable-next-line */
export interface CreateCaseFileProps {}

export function CreateCaseFile(props: CreateCaseFileProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CreateCaseFile!</h1>
    </div>
  );
}

export default CreateCaseFile;
