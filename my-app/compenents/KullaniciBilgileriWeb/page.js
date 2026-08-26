'use client';

import { useState } from 'react';
import styles from './page.module.css';
import ProfilWarning from "../ProfilWarning/page";
import { updateAction } from './actions';

export default function ProfilWeb({ info }) {
  
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialPhone = info.phone_number ? info.phone_number.replace(/^\+90/, '') : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const dataObj = Object.fromEntries(formData.entries());

    if (!dataObj.first_name) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen isminizi giriniz.", status:false  });
    }
    if (!dataObj.last_name) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen soyisminizi giriniz.", status:false  });
    }
    if (!dataObj.email) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen e-posta adresinizi giriniz.", status:false  });
    }
    if (!dataObj.phone) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Telefon numarasını giriniz.", status:false  });
    }
    if (dataObj.phone.length !== 10) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Telefon numarası 10 haneli olmalıdır.", status:false  });
    }


    const payload = {
      id: info.id,
      first_name: dataObj.first_name,
      last_name: dataObj.last_name,
      email: dataObj.email,
      phone_number: "+90" + dataObj.phone,
    };

    const response = await updateAction(payload);

    if (response.success) {
      setMessage({ title: "İşlem Başarılı", info: response.message, status:true  });
    } else {
      if (response.messageType === "field") {
        setMessage({ title: "Hatalı Güncelleme", info: response.message, status:false  });
      } else {
        setMessage({ title: "Bir Sorunla Karşılaştık", info: response.message, status:false  });
      }
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.profileWrapper}>
      <section className={styles.formSection}>
        <div className={styles.headerContainer}>
          <h2 className={styles.formTitle}>Kullanıcı Bilgileri</h2>
          <div className={styles.formExplanation}>Sistem yönetimi ve hatırlatıcı bildirimleriniz (SMS/E-posta) bu alandaki güncel bilgileriniz üzerinden yürütülür.</div>
        </div>
        
        {/* key prop'u profil objesinin içeriğine bağlıdır. router.refresh ile yeni profil geldiğinde form yenilenir */}
        <form key={JSON.stringify(info)} className={styles.form} onSubmit={handleSubmit}>
          
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>İsim</label>
              <input 
                type="text" 
                defaultValue={info.first_name || ''} 
                name="first_name" 
                placeholder="Örn: Mehmet" 
                className={styles.input} 
                maxLength={30}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Soyisim</label>
              <input 
                type="text" 
                defaultValue={info.last_name || ''} 
                name="last_name" 
                placeholder="Örn: Yıldırım" 
                className={styles.input} 
                maxLength={30}
              />
            </div>

          </div>

          <div className={styles.inputRow}>

            <div className={styles.inputGroup}>
              <label>E-posta Adresi</label>
              <input 
                type="email" 
                defaultValue={info.email || ''} 
                name="email"
                className={styles.input} 
                placeholder="ornek@domain.com"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Telefon Numarası</label>
              <div className={styles.phoneInputWrapper}>
                  <span className={styles.phonePrefix}>+90</span>
                  <input 
                      name="phone" 
                      defaultValue={initialPhone}
                      placeholder="532 000 00 00" 
                      className={styles.phoneInputClass} 
                      maxLength={10}
                      onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                      }}
                  />
              </div>
            </div>

          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" disabled={loading} className={styles.saveButton}>
              {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </form>
      </section>
      
      {message && <ProfilWarning message={message} setMessage={setMessage} />}
    </div>
  );
}