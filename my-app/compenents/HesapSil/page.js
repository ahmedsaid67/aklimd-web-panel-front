'use client';
import styles from './page.module.css';
import { useState } from 'react';
import { hesapSilAction } from './actions'; // Backend fonksiyonunuz (Email ve Şifre alacak şekilde)
import SuccessRes from '../SuccessRes/page';
import ErrorRes from '../ErrorRes/page';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // İkonları içe aktarıyoruz


export default function HesapSil() {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [successRed, setSuccessRed] = useState(null);
    const [errorRes, setErrorRes] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Şifre görünürlüğü için state
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Değişen input'a ait hatayı ve genel credential hatalarını temizle
        setErrors(prev => prev.filter(err => err.type !== name && err.type !== "credentials"));
    };

    const nextHandle = async () => {
        let newErrors = [];

        if (!formData.email) newErrors.push({ type: "email", info: "Lütfen e-posta adresinizi giriniz." });
        if (!formData.password) {
            newErrors.push({ type: "password", info: "Lütfen şifrenizi giriniz." });
        }

        if (newErrors.length > 0) {
            setErrors(prev => [...prev.filter(err => !newErrors.some(ne => ne.type === err.type)), ...newErrors]);
            return;
        }

        hesabiSil();
    };

    const hesabiSil = async () => {
        if (errors.length > 0) return;
        setLoading(true);

        const lastData = {
            email: formData.email,
            password: formData.password
        };

        const response = await hesapSilAction(lastData);
        console.log("response:", response);

        if (response.success) {
            setSuccessRed(response.message || "Hesabınız başarıyla silindi.");
            setTimeout(() => {
                router.push('/');   
            }, 2000);
        }

        if (!response.success) {
            if (response.messageType === "general") {
                setErrorRes(response.message);
                setFormData({ email: "", password: "" });
            } else {
                setErrors([{ type: response.messageType || "password", info: response.message }]);
            }
        }
        
        setLoading(false);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.formContainer}>
                <div className={styles.titleSection}>
                    <h1 className={styles.formTitle}>
                        Hesabı Sil
                    </h1>
                    <p className={styles.formSubtitle}>
                        Hesabınızı kalıcı olarak silmek için e-posta adresinizi ve şifrenizi giriniz. Bu işlem geri alınamaz.
                    </p>
                </div>

                <div className={styles.headerContainer}>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>E-posta Adresi</label>
                        <input
                            name="email"
                            type="email"
                            className={styles.inputClass}
                            placeholder="ornek@domain.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Şifre</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className={styles.inputClass}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className={styles.eyeButton}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Şifreyi göster/gizle"
                            >
                                {showPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
                            </button>
                        </div>
                    </div>
                </div>

                <button 
                    type="button" 
                    onClick={nextHandle} 
                    disabled={errors.length > 0 || loading}  
                    className={styles.deleteButtonContainer}
                >
                    {loading ? "Siliniyor..." : "Hesabımı Kalıcı Olarak Sil"}
                </button>

                <div className={styles.bottomContainer}>
                    {errors.length > 0 && (
                        <div className={styles.errorBox}>
                            <ul className={styles.errorList}>
                                {errors.map((err, index) => (
                                    <li key={index} className={styles.errorText}>
                                        {err.info}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {successRed && <SuccessRes successRed={successRed} />}
            {errorRes && <ErrorRes errorRes={errorRes} setErrorRes={setErrorRes} />}
        </div>
    );
}