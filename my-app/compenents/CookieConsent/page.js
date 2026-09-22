'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Sayfa ilk açıldığında / yenilendiğinde kontrol et
    const consent = localStorage.getItem('aklimda_cookie_consent');
    if (!consent) {
      setShow(true);
    }

    // Footer'dan gelen "Çerez Ayarları" tıklamasını dinle
    const handleOpenSettings = () => {
      setShow(true);
      setShowSettings(true);
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
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.icon}>🍪</span>
          <h3>Çerez Tercihleriniz</h3>
        </div>

        <p className={styles.description}>
          Platformun düzgün çalışması için zorunlu çerezler kullanıyoruz. Detaylar için <Link href="/cerez-politikasi" className={styles.link}>Çerez Politikası</Link>.
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
      </div>
    </div>
  );
}