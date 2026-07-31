import styles from './page.module.css';

export default function InternalserverError() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.icon}>⚠️</div>
      <h1 className={styles.title}>Bir Şeyler Ters Gitti</h1>
      <p className={styles.description}>
        Beklenmedik hata oluştu daha sonra tekrar deneyiniz.
      </p>
    </div>
  );
}