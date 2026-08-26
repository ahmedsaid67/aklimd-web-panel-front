'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { ChevronLeft, User, Building2, CheckCircle2 } from 'lucide-react';
import { registerAction } from './action';
import { useRouter } from 'next/navigation';
import SuccessRes from '../SuccessRes/page';
import ErrorRes from '../ErrorRes/page';

export default function Page() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '',
        userType: 'individual',
        phone: ''
    });

    const [errors, setErrors] = useState([]);
    const [successRed,setSuccessRed] = useState(null)
    const [errorRes,setErrorRes] = useState(null)
    const router = useRouter();
    const [loading,setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Değişen input'a ait hatayı diziden çıkarıyoruz
        setErrors(prev => prev.filter(err => err.type !== name));

    };

    const kayitOl = async () => {
        // Hata varsa işlem yapma
        if (errors.length > 0) return;

        setLoading(true)

        const lastData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
            profile_type: formData.userType,
            phone_number: "+90" + formData.phone
        };

        //console.log("lastData:",lastData)

        const response = await registerAction(lastData);
        //console.log("response:", response);


        if (response.success){
            setSuccessRed(response.message )
            setTimeout(() => {
                router.replace('/panel');
            }, 2000);
        }

        if (!response.success){
            if(response.messageType==="general"){
                setErrorRes(response.message)
                setFormData({
                    firstName: '', lastName: '', email: '', password: '',
                    userType: 'bireysel',
                    phone: ''
                })
                setStep(1)
            }else{
                setErrors([{ type: response.messageType, step: response.step, info: response.message }])
            }
        }
        setLoading(false)
    };

    const nextHandle = () => {
        let newErrors = [];

        if (step === 1) {
            if (!formData.firstName) newErrors.push({ type: "firstName", step: 1, info: "Lütfen isminizi giriniz." });
            if (!formData.lastName) newErrors.push({ type: "lastName", step: 1, info: "Lütfen soyisminizi giriniz." });
            if (!formData.email) newErrors.push({ type: "email", step: 1, info: "Lütfen e-posta adresinizi giriniz." });
            if (!formData.password) {
                newErrors.push({ type: "password", step: 1, info: "Lütfen şifrenizi giriniz." });
            } else if (formData.password.length < 8) {
                newErrors.push({ type: "password", step: 1, info: "Şifre en az 8 karakter olmalıdır." });
            }
        } 
        else if (step === 2) {
            if (!formData.userType) {
                newErrors.push({ type: "userType", step: 2, info: "Bir hesap türü seçiniz." });
            }
        } 
        else if (step === 3) {
            if (!formData.phone) {
                newErrors.push({ type: "phone", step: 3, info: "Telefon numarasını giriniz." });
            } else if (formData.phone.length !== 10) {
                newErrors.push({ type: "phone", step: 3, info: "Telefon numarası 10 haneli olmalıdır." });
            }

        }

        if (newErrors.length > 0) {
            // Mevcut hataları koru, aynı tipleri güncelle ve yeni hataları ekle
            setErrors(prev => [...prev.filter(err => !newErrors.some(ne => ne.type === err.type)), ...newErrors]);
            return;
        }

        // Hata yoksa sonraki adıma geç
        if (step < 3) {
            setStep(step + 1);
        } else {
            kayitOl();
        }
    };



    const isButtonDisabled = 
        loading || 
        errors.some(err => err.step === step) || 
        (step === 3 && errors.length > 0);

    return (
        <div className={styles.mainContainer}>
            <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
                
                {/* Stepper Header */}
                <div className={styles.stepperContainer}>
                    <button 
                        type="button" 
                        onClick={() => step > 1 && setStep(step - 1)} 
                        className={`${styles.backButton} ${step === 1 ? styles.backButtonDisabled : ''}`}
                    >
                        <ChevronLeft size={18} />
                        <span>Geri</span>
                    </button>
                    
                    <div className={styles.stepIndicatorWrapper}>
                        <div className={styles.progressBar}>
                            <div 
                                className={styles.progressFill} 
                                style={{ width: `${(step / 3) * 100}%` }}
                            ></div>
                        </div>
                        <span className={styles.stepIndicator}>
                            Adım <span className={styles.activeStepNum}>{step}</span>/3
                        </span>
                    </div>
                </div>

                <div className={styles.titleSection}>
                    <h1 className={styles.formTitle}>
                        {step === 1 && "Hesap Oluşturun"}
                        {step === 2 && "Hesap Türü Seçin"}
                        {step === 3 && "İşlemi Tamamlayın"}
                    </h1>
                </div>

                <div className={styles.headerContainer}>
                    {step === 1 && (
                        <div className={styles.stepAnimation}>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>İsim</label>
                                <input name="firstName" maxLength={30} value={formData.firstName} placeholder="Örn: Ahmet" className={styles.inputClass} onChange={handleChange} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Soyisim</label>
                                <input name="lastName" maxLength={30} value={formData.lastName} placeholder="Örn: Yılmaz" className={styles.inputClass} onChange={handleChange} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>E-posta Adresi</label>
                                <input name="email" type="email" value={formData.email} placeholder="ornek@domain.com" className={styles.inputClass} onChange={handleChange} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Şifre</label>
                                <input name="password" type="password" value={formData.password} placeholder="••••••••" className={styles.inputClass} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className={styles.stepAnimation}>
                            <div className={styles.radioGroup}>
                                <label className={`${styles.radioCard} ${formData.userType === 'individual' ? styles.activeRadio : ''}`}>
                                    <input type="radio" name="userType" value="individual" checked={formData.userType === 'individual'} onChange={handleChange} />
                                    <div className={styles.radioIconWrapper}><User size={24} /></div>
                                    <div className={styles.radioContent}>
                                        <span className={styles.radioTitle}>Bireysel</span>
                                    </div>
                                    <div className={styles.radioCheck}><CheckCircle2 size={18} /></div>
                                </label>

                                <label className={`${styles.radioCard} ${formData.userType === 'corporate' ? styles.activeRadio : ''}`}>
                                    <input type="radio" name="userType" value="corporate" checked={formData.userType === 'corporate'} onChange={handleChange} />
                                    <div className={styles.radioIconWrapper}><Building2 size={24} /></div>
                                    <div className={styles.radioContent}>
                                        <span className={styles.radioTitle}>Kurumsal</span>
                                    </div>
                                    <div className={styles.radioCheck}><CheckCircle2 size={18} /></div>
                                </label>
                            </div>
                        </div>
                    )}
            
                    {step === 3 && (
                        <div className={styles.stepAnimation}>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel}>Telefon Numarası</label>
                                <div className={styles.phoneInputWrapper}>
                                    <span className={styles.phonePrefix}>+90</span>
                                    <input 
                                        name="phone" 
                                        value={formData.phone} 
                                        placeholder="532 000 00 00" 
                                        className={styles.phoneInputClass} 
                                        onChange={(e) => {
                                            const rawValue = e.target.value;
                                            
                                            // Eğer girilen değerin içinde rakam dışı bir karakter varsa, hiç işleme alma (state'i değiştirme, hatalara dokunma)
                                            if (/[^0-9]/.test(rawValue)) {
                                                return; 
                                            }

                                            const numericValue = rawValue.slice(0, 10);
                                            handleChange({ target: { name: 'phone', value: numericValue } });
                                        }} 
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={nextHandle}
                    disabled={isButtonDisabled}
                    className={`${styles.buttonContainer} ${isButtonDisabled ? styles.disabledButton : ''}`}
                >
                    {step < 3 ? "Devam Et" : "Kayıt Ol"}
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
            </form>

            {successRed && <SuccessRes successRed={successRed} />}
            {errorRes && <ErrorRes errorRes={errorRes} setErrorRes={setErrorRes}  />}
        </div>
    );
}