'use client';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResetPassword } from './actions';
import ErrorResetRes from '../ErrorResetRes/page';
import SuccessRes from '../SuccessRes/page';

export default function PasswordResetPage() {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // Input/Form altındaki spesifik hatalar
    const [errorRes, setErrorRes] = useState(null); // Genel/Sunucu hataları için pop-up
    const [successRed, setSuccessRed] = useState(null); // Başarılı işlem modalı
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!code) {
            setError('Lütfen doğrulama kodunu giriniz.');
            return;
        }
        if (!newPassword) {
            setError('Lütfen yeni şifrenizi giriniz.');
            return;
        }

        if (newPassword.length < 8) {
            setError('Şifreniz en az 8 karakter uzunluğunda olmalıdır.');
            return;
        }

        setLoading(true);
        setError('');
        setErrorRes(null);
        setSuccessRed(null);

        try {
            const result = await ResetPassword({ code, newPassword });

            if (result.success) {
                setSuccessRed(result.message);
                
                setTimeout(() => {
                    router.push('/giris-yap');
                }, 3000);
            } else {
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
                        Şifre Sıfırlama
                    </h1>
                </div>
                <div className={styles.headerContainer}>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Doğrulama Kodu</label>
                        <input
                            name="code"
                            type="text"
                            maxLength={6}
                            className={styles.inputClass}
                            placeholder="6 haneli kod"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                                setError('');
                            }}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Yeni Şifre</label>
                        <input
                            name="new_password"
                            type="password"
                            className={styles.inputClass}
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setError('');
                            }}
                            disabled={loading}
                        />
                    </div>
                </div>

                <button type="submit" disabled={loading} className={styles.buttonContainer}>
                    {loading ? 'İşleniyor...' : 'Şifreyi Sıfırla'}
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
            {errorRes && <ErrorResetRes errorRes={errorRes} setErrorRes={setErrorRes} />}
        </div>
    );
}