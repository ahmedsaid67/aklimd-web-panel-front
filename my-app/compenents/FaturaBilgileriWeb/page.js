'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import ProfilWarning from "../ProfilWarning/page";
import { updateAction } from './actions';

// Türkiye'nin 81 ili
const TURKEY_CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

export default function ProfilWeb({ info }) {
  
  const [userType, setUserType] = useState(info.profile_type || 'individual');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Şehir Dropdown Arama ve Açılma State'leri
  const [citySearch, setCitySearch] = useState('');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const cityDropdownRef = useRef(null);

  const initialPhone = info.phone_number ? info.phone_number.replace(/^\+90/, '') : '';

  // Dışarı tıklandığında dropdown'ı kapatma
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Şehir filtreleme mantığı
  const filteredCities = TURKEY_CITIES.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const dataObj = Object.fromEntries(formData.entries());

    // Ortak Alan Validasyonları
    if(!userType){
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen fatura tipini seçiniz.", status:false });
    }
    
    if (!dataObj.email) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen e-posta adresinizi giriniz.", status:false });
    }
    if (!dataObj.phone) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Telefon numarasını giriniz.", status:false });
    }
    if (dataObj.phone.length !== 10) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Telefon numarası 10 haneli olmalıdır.", status:false });
    }


    // Tür Bazlı Validasyonlar
    if (userType === 'individual') {
      if (!dataObj.first_name || dataObj.first_name.trim() === "") {
        setLoading(false);
        return setMessage({ title: "Uyarı", info: "Lütfen isminizi giriniz.", status:false });
      }
      if (!dataObj.last_name || dataObj.last_name.trim() === "") {
        setLoading(false);
        return setMessage({ title: "Uyarı", info: "Lütfen soyisminizi giriniz.", status:false });
      }
      if (!dataObj.tc_no) {
        setLoading(false);
        return setMessage({ title: "Uyarı", info: "Lütfen T.C. Kimlik Numaranızı giriniz.", status:false });
      }
      if (dataObj.tc_no.length !== 11) {
        setLoading(false);
        return setMessage({ title: "Uyarı", info: "T.C. Kimlik Numarası 11 haneli olmalıdır.", status:false });
      }
    } else {
      if (!dataObj.company_name || dataObj.company_name.trim() === "") {
        setLoading(false);
        return setMessage({ title: "Uyarı", info: "Lütfen şirket adını giriniz.", status:false });
      }
      if (!dataObj.tax_office || dataObj.tax_office.trim() === "") {
        setLoading(false);
        return setMessage({ title: "Uyarı", info: "Lütfen vergi dairesini giriniz.", status:false });
      }
      if (!dataObj.tax_no) {
        setLoading(false);
        return setMessage({ title: "Uyarı", info: "Lütfen vergi numarasını giriniz." , status:false});
      }
      if (dataObj.tax_no.length !== 10) {
        setLoading(false);
        return setMessage({ title: "Uyarı", info: "Vergi Numarası 10 haneli olmalıdır.", status:false });
      }
    }

    // Adres ve Lokasyon Validasyonları
    if (!dataObj.country) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen ülke giriniz.", status:false });
    }
    if (!dataObj.city) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen şehir seçiniz.", status:false });
    }
    if (!dataObj.postal_code) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen posta kodunu giriniz." , status:false});
    }
    if (dataObj.postal_code.length !== 5) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Posta kodu 5 haneli olmalıdır.", status:false });
    }
    if (!dataObj.address_line || dataObj.address_line.trim() === "") {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen açık adresinizi giriniz.", status:false });
    }
    if (dataObj.address_line.trim().length < 10) {
      setLoading(false);
      return setMessage({ title: "Uyarı", info: "Lütfen geçerli ve açık bir adres giriniz.", status:false });
    }

    const payload = {
      id: info.id,
      profile_type: userType,
      email: dataObj.email,
      phone_number: "+90" + dataObj.phone,
      country: dataObj.country,
      city: dataObj.city,
      address_line: dataObj.address_line,
      postal_code: dataObj.postal_code,
    };

    if (userType === 'individual') {
      payload.first_name = dataObj.first_name;
      payload.last_name = dataObj.last_name;
      payload.tc_no = dataObj.tc_no;
    } else {
      payload.company_name = dataObj.company_name;
      payload.tax_office = dataObj.tax_office;
      payload.tax_no = dataObj.tax_no;
    }

    const response = await updateAction(payload);

    if (response.success) {
      setMessage({ title: "İşlem Başarılı", info: response.message, status:true });
    } else {
      if (response.messageType === "field") {
        setMessage({ title: "İşlem Gerçekleştirilemedi", info: response.message, status:false });
      } else {
        setMessage({ title: "Bir Sorunla Karşılaştık", info: response.message, status:false });
      }
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.profileWrapper}>
      <section className={styles.formSection}>
        <div className={styles.headerContainer}>
          <h2 className={styles.formTitle}>Fatura Bilgileri</h2>
          <div className={styles.formExplanation}>Faturalandırma işlemlerinde kullanılacak bilgileriniz buradan yönetilir.</div>
        </div>
        
        <form key={JSON.stringify(info)} className={styles.form} onSubmit={handleSubmit}>
          
          {/* 1. Satır: Fatura Tipi, E-posta ve Telefon */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Fatura Tipi</label>
              <div className={styles.typeSelector}>
                <button
                  type="button"
                  className={`${styles.typeOption} ${userType === 'individual' ? styles.activeType : ''}`}
                  onClick={() => setUserType('individual')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Bireysel</span>
                </button>

                <button
                  type="button"
                  className={`${styles.typeOption} ${userType === 'corporate' ? styles.activeType : ''}`}
                  onClick={() => setUserType('corporate')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span>Kurumsal</span>
                </button>
              </div>
            </div>

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

          {/* 2. Satır: Bireysel / Kurumsal Alanlar */}
          <div style={{ display: userType === 'individual' ? 'flex' : 'none' }} className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>İsim</label>
              <input type="text" defaultValue={info.first_name || ''} name="first_name" placeholder="Örn: Mehmet" className={styles.input} maxLength={30} />
            </div>
            <div className={styles.inputGroup}>
              <label>Soyisim</label>
              <input type="text" defaultValue={info.last_name || ''} name="last_name" placeholder="Örn: Yıldırım" className={styles.input} maxLength={30} />
            </div>
            <div className={styles.inputGroup}>
              <label>T.C. Kimlik No</label>
              <input 
                type="text" 
                defaultValue={info.tc_no || ''} 
                name="tc_no" 
                placeholder="11 haneli T.C. No" 
                className={styles.input} 
                maxLength={11}
                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11); }}
              />
            </div>
          </div>
      
          <div style={{ display: userType === 'corporate' ? 'flex' : 'none' }} className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Şirket Adı</label>
              <input type="text" defaultValue={info.company_name || ''} name="company_name" placeholder="Şirket unvanı" className={styles.input} maxLength={200} />
            </div>
            <div className={styles.inputGroup}>
              <label>Vergi Dairesi</label>
              <input type="text" defaultValue={info.tax_office || ''} name="tax_office" placeholder="Vergi dairesi" className={styles.input} maxLength={75}/>
            </div>
            <div className={styles.inputGroup}>
              <label>Vergi No</label>
              <input 
                type="text" 
                defaultValue={info.tax_no || ''} 
                name="tax_no" 
                placeholder="10 haneli vergi numarası" 
                className={styles.input} 
                maxLength={10}
                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10); }}
              />
            </div>
          </div>

          {/* 3. Satır: Adres Bilgileri */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Ülke</label>
              <input 
                type="text" 
                defaultValue={info.country || 'Türkiye'} 
                readOnly
                name="country" 
                className={`${styles.input} ${styles.disabled}`} 
              />
            </div>

            {/* Şehir Seçim Alanı (Tek Gerçek Input) */}
            <div className={styles.inputGroup} ref={cityDropdownRef}>
              <label>Şehir</label>
              <div
                className={styles.inputContainer}
                onClick={() => setCityDropdownOpen((prev) => !prev)}
              >
                <input
                  type="text"
                  readOnly
                  name="city"
                  id="visibleCityInput"
                  defaultValue={info.city || ""}
                  placeholder="Şehir seçiniz"
                  className={styles.input}
                />
                <div className={styles.inputIconContainer}>
                  <svg 
                    className={`${styles.icon} ${cityDropdownOpen ? styles.iconOpen : ""}`} 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </div>

              {/* Dropdown Kutusu */}
              {cityDropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownSearchWrapper}>
                    <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input 
                      type="text" 
                      className={styles.dropdownSearchInput}
                      placeholder="Şehir ara..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className={styles.dropdownList}>
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          className={`${styles.option} ${document.getElementById('visibleCityInput')?.value === city ? styles.optionSelected : ""}`}
                          onClick={() => {
                            document.getElementById('visibleCityInput').value = city;
                            setCityDropdownOpen(false);
                            setCitySearch('');
                          }}
                        >
                          <span className={styles.optionTitle}>{city}</span>
                        </button>
                      ))
                    ) : (
                      <div className={styles.noResult}>Şehir bulunamadı</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Posta Kodu</label>
              <input 
                type="text" 
                defaultValue={info.postal_code || ''} 
                name="postal_code" 
                placeholder="Örn: 34000" 
                className={styles.input} 
                maxLength={5}
                onInput={(e) => { 
                  e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 5); 
                }}
              />
            </div>
          </div>

          {/* 4. Satır: Açık Adres */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label>Açık Adres</label>
              <input 
                type="text" 
                defaultValue={info.address_line || ''} 
                name="address_line" 
                placeholder="Mahalle, Cadde/Sokak, Bina No, Daire No, İlçe" 
                className={styles.input} 
                maxLength={250}
              />
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