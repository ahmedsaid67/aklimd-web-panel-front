'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aklimda_cookie_consent');
    if (!consent) {
      setShow(true); // Daha önce hiç tercih yapılmadıysa modalı aç
    }

    // Footer'dan gelen "Çerez Ayarları" tıklamasını dinleyen mevcut kodun...
    const handleOpenSettings = () => {
      const currentConsent = localStorage.getItem('aklimda_cookie_consent');
      if (currentConsent) {
        try {
          const parsed = JSON.parse(currentConsent);
          setAnalytics(!!parsed.analytics);
          setMarketing(!!parsed.marketing);
        } catch (e) {
          console.error(e);
        }
      }

      setShow(true);
      setShowSettings(true);
      setShowPolicy(false);
    };

    window.addEventListener('openCookieSettingsModal', handleOpenSettings);
    return () => {
      window.removeEventListener('openCookieSettingsModal', handleOpenSettings);
    };
  }, []);


  
  const saveConsent = (analyticsVal, marketingVal) => {
    const consentData = {
      necessary: true,
      analytics: analyticsVal,
      marketing: marketingVal,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('aklimda_cookie_consent', JSON.stringify(consentData));
    setShow(false);
    setShowSettings(false);
    setShowPolicy(false);

    // BURASI YENİ: Analitik onaylandıysa sisteme sinyal gönderiyoruz
    if (analyticsVal) {
      window.dispatchEvent(new Event('cookieAnalyticsApproved'));
    }

  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.icon}>🍪</span>
          <h3>Çerez Tercihleriniz</h3>
        </div>

        {showPolicy ? (
          <div className={styles.policyContainer}>
            <h4 className={styles.policyTitle}>Çerez Politikası</h4>
            <div className={styles.policyScrollArea}>
              <p><strong>Son Güncelleme Tarihi:</strong> 24.09.2026</p>
              <p>İşbu Çerez Politikası; Gökhan ADIGÜZEL (“Veri Sorumlusu”) tarafından işletilen Aklımda resmi web sitesi (arabamuayene.com.tr) üzerinden ziyaretçilere sunulan çerez kullanımına ilişkin hususları açıklamak amacıyla hazırlanmıştır.</p>
              
              <h5>1. Çerez Nedir?</h5>
              <p>Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Web sitesinin düzgün çalışması, kullanıcı deneyiminin iyileştirilmesi, oturum güvenliğinin sağlanması ve site kullanım istatistiklerinin oluşturulması amacıyla kullanılmaktadır.</p>
              
              <h5>2. Platformumuzda Kullanılan Çerez Türleri</h5>
              <p>Aklımda web sitesinde platformun işlevselliğine ve kullanım amacına bağlı olarak aşağıdaki kategorilerde çerezler kullanılabilmektedir:</p>
              <ul>
                <li><strong>Zorunlu Çerezler:</strong> Platformun teknik olarak çalışabilmesi, üye girişi yapabilmeniz, oturumunuzun güvenli bir şekilde sürdürülmesi ve çerez tercihlerinizin hatırlanması için zorunlu olan çerezlerdir. Bu çerezler kapatılamaz.</li>
                <li><strong>Analitik / Performans Çerezleri (Google Analytics):</strong> Kullanıcıların web sitesini nasıl kullandığını analiz etmemize ve site performansını iyileştirmemize yardımcı olan çerezlerdir. Yalnızca açık rızanızla etkinleştirilir.</li>
                <li><strong>Hedefleme / Pazarlama Çerezleri (Google Ads):</strong> Reklam kampanyalarının etkinliğini ölçmek ve ilgi alanlarınıza uygun reklamlar gösterebilmek amacıyla kullanılan çerezlerdir. Yalnızca açık rızanızla yüklenir.</li>
              </ul>

              <h5>3. Çerez Tercihlerini Yönetme</h5>
              <p>Siteye ilk girişinizde gösterilen çerez bildiriminden "Ayarları Yönet" ile analitik ve pazarlama çerezlerini ayrı ayrı açıp kapatabilirsiniz. Açık rızanızı vermediğiniz sürece bu çerezler yüklenmez.</p>

              <h5>4. Üçüncü Taraf Çerezleri ve Hizmetler</h5>
              <p>Platformumuz üzerinde Google Analytics ve Google Ads hizmetleri kullanılmaktadır. İlgili kategoriye açık rızanızı vermediğiniz takdirde bu çerezler yüklenmez.</p>

              <h5>5. İletişim</h5>
              <p>Her türlü soru ve bildirim için: flexsoftwaretr@gmail.com adresinden bizimle iletişime geçebilirsiniz.</p>
            </div>
            <button 
              className={styles.backButton} 
              onClick={() => setShowPolicy(false)}
            >
              ← Tercihlere Geri Dön
            </button>
          </div>
        ) : (
          <>
            <p className={styles.description}>
              Platformun düzgün çalışması için zorunlu çerezler kullanıyoruz. Detaylar için{' '}
              <button 
                type="button" 
                className={styles.inlineLinkButton} 
                onClick={() => setShowPolicy(true)}
              >
                Çerez Politikası'nı inceleyin
              </button>.
            </p>

            {showSettings ? (
              <div className={styles.settingsBox}>
                <div className={styles.optionRow}>
                  <div>
                    <strong>Zorunlu çerezler</strong>
                    <p>Oturum ve güvenlik için gereklidir, kapatılamaz.</p>
                  </div>
                  <input type="checkbox" checked disabled />
                </div>

                <div className={styles.optionRow}>
                  <div>
                    <strong>Analitik çerezler</strong>
                    <p>Site kullanımını anonim olarak ölçmemizi sağlar.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={analytics} 
                    onChange={(e) => setAnalytics(e.target.checked)} 
                  />
                </div>

                <div className={styles.optionRow}>
                  <div>
                    <strong>Pazarlama çerezleri</strong>
                    <p>Reklam performansını ölçmek için kullanılır.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={marketing} 
                    onChange={(e) => setMarketing(e.target.checked)} 
                  />
                </div>

                <button 
                  className={styles.saveButton} 
                  onClick={() => saveConsent(analytics, marketing)}
                >
                  Tercihleri Kaydet
                </button>
              </div>
            ) : (
              <div className={styles.buttonGroup}>
                <button 
                  className={styles.acceptAll} 
                  onClick={() => saveConsent(true, true)}
                >
                  Tümünü Kabul Et
                </button>
                <button 
                  className={styles.acceptOnlyNecessary} 
                  onClick={() => saveConsent(false, false)}
                >
                  Yalnızca Zorunlu
                </button>
                <button 
                  className={styles.settingsToggle} 
                  onClick={() => setShowSettings(true)}
                >
                  Ayarları Yönet
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}