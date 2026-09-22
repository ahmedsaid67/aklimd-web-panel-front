'use client';
import styles from './page.module.css';
import { ShieldCheck, BellRing, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorRes from '../ErrorRes/page';
import { cikisYap } from './actions';

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleLogout = async () => {
        setIsLoading(true);
        setMessage(null);

        const response = await cikisYap();
        
        if (response && response.success) {
            router.push('/');
            router.refresh();
        } else {
            setMessage(response?.message);
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.profileWrapper}>
            <section className={styles.formSection}>
                <div className={styles.headerContainer}>
                    <h2 className={styles.formTitle}>Oturumu Kapat</h2>
                    <div className={styles.formExplanation}>
                        Oturumunuzu sonlandırarak güvenli bir şekilde çıkış yapabilirsiniz.
                    </div>
                </div>
                <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                        <div className={styles.iconBox}>
                            <ShieldCheck className={styles.statIcon} />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>Verileriniz Güvende Kalır</span>
                            <span className={styles.cardText}>
                                Oturumunuzu sonlandırdığınızda hesap verileriniz güvenli bir şekilde saklanmaya devam eder. Dilediğiniz zaman tekrar giriş yaparak kaldığınız yerden devam edebilirsiniz.
                            </span>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.iconBox}>
                            <BellRing className={styles.statIcon} />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>Hatırlatıcılarınız Çalışmaya Devam Eder</span>
                            <span className={styles.cardText}>
                                Sistemde tanımlı olan aktif hatırlatıcılarınız ve planlı bildirimleriniz (SMS ve e-posta) belirlenen zamanlarda aksamadan gönderilmeye devam eder. Oturumun kapalı olması hatırlatıcı haklarınızı veya süreçlerinizi etkilemez.
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.ctaContainer}>
                    <div className={styles.ctaContent}>
                        <h3 className={styles.ctaTitle}>Oturumu Kapatmak İstediğinizden Emin Misiniz?</h3>
                        <p className={styles.ctaDescription}>
                            Oturumu kapattıktan sonra kaldığınız yerden devam etmek için dilediğiniz zaman tekrar giriş yapabilirsiniz.
                        </p>
                    </div>
                    <button 
                        className={styles.logoutButton} 
                        onClick={handleLogout}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className={styles.spinner}></span>
                                <span>Çıkış Yapılıyor...</span>
                            </>
                        ) : (
                            <>
                                <LogOut className={styles.ctaButtonIcon} />
                                <span>Oturumu Kapat</span>
                            </>
                        )}
                    </button>
                </div>
            </section>
            {message && <ErrorRes errorRes={message} setErrorRes={setMessage}/>}
        </div>
    );
}