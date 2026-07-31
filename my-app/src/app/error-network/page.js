import styles from './page.module.css';

export default function NetworkErrorPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.icon}>⚠️</div>
      <h1 className={styles.title}>Bağlantı Kurulamadı</h1>
      <p className={styles.description}>
        Sunucuya şu an erişemiyoruz. İnternet bağlantınızı kontrol edebilir veya sistemin tekrar normale dönmesini bekleyebilirsiniz.
      </p>
    </div>
  );
}