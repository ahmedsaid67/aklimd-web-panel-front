'use client';
import styles from './page.module.css';
import { useState } from 'react';
import { loginAction } from './actions';
import SuccessRes from '../SuccessRes/page';
import ErrorRes from '../ErrorRes/page';
import { useRouter } from 'next/navigation';


export default function Page(){

    const [errors, setErrors] = useState([]);
    const [formData,setFormData] = useState({email:"",password:""})
    const [successRed,setSuccessRed] = useState(null)
    const [errorRes,setErrorRes] = useState(null)
    const router = useRouter();
    const [loading,setLoading] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // 1. Değişen input'a ait hatayı sil
        // 2. Kullanıcı herhangi bir yere yazdığı an "credentials" (yanlış şifre/mail) hatasını da sil
        setErrors(prev => prev.filter(err => err.type !== name && err.type !== "credentials"));
    };

    const nextHandle = async () =>{

        let newErrors = [];

        if (!formData.email) newErrors.push({ type: "email",info: "Lütfen e-posta adresinizi giriniz." });
        if (!formData.password) {
            newErrors.push({ type: "password", info: "Lütfen şifrenizi giriniz." });
        }

        if (newErrors.length > 0) {
            // Mevcut hataları koru, aynı tipleri güncelle ve yeni hataları ekle
            setErrors(prev => [...prev.filter(err => !newErrors.some(ne => ne.type === err.type)), ...newErrors]);
            return;
        }

        girisYap()

    }

    const girisYap = async() =>{

        // Hata varsa işlem yapma
        if (errors.length > 0) return;
        setLoading(true)

        const lastData = {
            email:formData.email,
            password:formData.password
        }


        const response = await loginAction(lastData);
        console.log("response:", response);


        if (response.success){
            setSuccessRed(response.message )
            setTimeout(() => {
                router.replace('/panel');
            }, 2000);
        }

        if (!response.success){
            if(response.messageType==="general"){
                setErrorRes(response.message)
                setFormData({email:"",password:""})
            }else{
                setErrors([{ type: response.messageType, info: response.message }])
            }
        }

        setLoading(false)

    }


    return(
        <div className={styles.mainContainer}>
            <form className={styles.formContainer}>
                <div className={styles.titleSection}>
                    <h1 className={styles.formTitle}>
                        Giriş Yap
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
                            value={formData.email}
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Şifre</label>
                        <input
                            name="password"
                            type="password"
                            className={styles.inputClass}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="button" onClick={nextHandle} disabled={errors.length>0 || loading}  className={styles.buttonContainer}>Giriş Yap</button>
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
            </form>

            {successRed && <SuccessRes successRed={successRed} />}
            {errorRes && <ErrorRes errorRes={errorRes} setErrorRes={setErrorRes}  />}
        </div>
    )
}