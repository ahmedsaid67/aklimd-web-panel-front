// components/GoogleAnalyticsManager/page.js
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function GoogleAnalyticsManager() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const GA_MEASUREMENT_ID = 'G-QJWHQYQT0V';

  useEffect(() => {
    // 1. Sayfa açıldığında daha önceden çerez izni verilmiş mi kontrol et
    const consent = localStorage.getItem('aklimda_cookie_consent');
    if (consent) {
      try {
        const parsed = JSON.parse(consent);
        if (parsed.analytics) {
          setAnalyticsAllowed(true);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Kullanıcı anlık olarak "Kabul Et" butonuna basarsa haberdar ol
    const handleApproval = () => {
      setAnalyticsAllowed(true);
    };

    window.addEventListener('cookieAnalyticsApproved', handleApproval);
    return () => {
      window.removeEventListener('cookieAnalyticsApproved', handleApproval);
    };
  }, []);

  // Eğer analitik izni verilmediyse Google kodunu hiç yükleme
  if (!analyticsAllowed) return null;

  // İzin verildiyse Google Analytics script'lerini sayfaya enjekte et
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}