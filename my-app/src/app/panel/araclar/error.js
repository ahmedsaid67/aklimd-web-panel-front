// error.js (Client Component)
'use client';
import styles from './page.module.css'

export default function Error({ error }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorTitle}>Bir Sorunla Karşılaştık</div>
      <div className={styles.errorContext}>{error.message}</div> 
    </div>
  );
}