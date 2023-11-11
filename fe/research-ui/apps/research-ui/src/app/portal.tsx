import styles from './portal.module.css';

export interface PortalProps {}

export function Portal(props: PortalProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Portal!</h1>
    </div>
  );
}

export default Portal;
