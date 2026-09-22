'use client';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ForgotPassword } from './actions';
import ErrorRes from '../ErrorRes/page';
import SuccessRes from '../SuccessRes/page'; // SuccessRes bileşeninin doğru yolu

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // Input altındaki spesifik hatalar (örn: mail geçersiz)
    const [errorRes, setErrorRes] = useState(null); // Genel hatalar için pop-up state'i
    const [successRed, setSuccessRed] = useState(null); // Başarılı işlem modalı için state
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Lütfen e-posta adresinizi giriniz.');
            return;
        }

        setLoading(true);
        setError('');
        setErrorRes(null);
        setSuccessRed(null);

        try {
            const result = await ForgotPassword(email);

            if (result.success) {
                // Başarılı pop-up'ını tetikle
                setSuccessRed(result.message);
                
                // 2 saniye bekleyip şifre yenileme sayfasına yönlendiriyoruz
                setTimeout(() => {
                    router.push('/sifremi-unuttum/sifirla');
                }, 8000);
            } else {
                // Genel hata ise modal tetikle, input/alan hatası ise input altında göster
                if (result.messageType === "general") {
                    setErrorRes(result.message);
                    setLoading(false);
                } else {
                    setError(result.message);
                    setLoading(false);
                }
            }
        } catch (err) {
            setErrorRes('Beklenmeyen bir hata oluştu, lütfen daha sonra deneyiniz.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.titleSection}>
                    <h1 className={styles.formTitle}>
                        Şifremi Unuttum
                    </h1>
                </div>
                <div className={styles.headerContainer}>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>E-posta Adresi</label>
                        <input
                            name="email"
                            type="email"
                            className={styles.inputClass}
                            placeholder="ornek@domain.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            disabled={loading}
                        />
                    </div>
                </div>

                <button type="submit" disabled={loading} className={styles.buttonContainer}>
                    {loading ? 'Gönderiliyor...' : 'Kod Gönder'}
                </button>

                <div className={styles.bottomContainer}>
                    {/* Alan / Input Bazlı Hatalar */}
                    {error && (
                        <div className={styles.errorBox}>
                            <ul className={styles.errorList}>
                                <li className={styles.errorText}>
                                    {error}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </form>

            {successRed && <SuccessRes successRed={successRed} />}
            {errorRes && <ErrorRes errorRes={errorRes} setErrorRes={setErrorRes} />}
        </div>
    );
}