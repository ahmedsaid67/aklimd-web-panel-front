"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import styles from './page.module.css';

export default function Navbar({ isAuthenticated }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.navbarHeader}>
      <div className={styles.navbarContainer}>
        
        {/* Sol: Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          Aklımda
        </Link>

        {/* Orta: Masaüstü Menü Linkleri */}
        <nav className={styles.navLinks}>
          <Link href="/hakkimizda" className={styles.navLink}>Hakkımızda</Link>
          <Link href="/mobil-uygulama" className={styles.navLink}>Mobil Uygulama</Link>
          <Link href="/sikca-sorulan-sorular" className={styles.navLink}>S.S.S</Link>
          <Link href="/iletisim" className={styles.navLink}>İletişim</Link>
        </nav>

        {/* Sağ: Masaüstü Dinamik Butonlar */}
        <div className={styles.navActions}>
          {isAuthenticated ? (
            <Link href="/panel" className={styles.primaryButton}>
              Platforma Git
              <ArrowRight className={styles.buttonArrowIcon} aria-hidden="true" />
            </Link>
          ) : (
            <>
              <Link href="/giris-yap" className={styles.secondaryButton}>
                Platforma Giriş
              </Link>
              <Link href="/kayit-ol" className={styles.primaryButton}>
                Hemen Başla
                <ArrowRight className={styles.buttonArrowIcon} aria-hidden="true" />
              </Link>
            </>
          )}
        </div>

        {/* Mobil Hamburger Butonu */}
        <button 
          className={styles.hamburgerButton} 
          onClick={toggleMenu} 
          aria-label="Menüyü Aç/Kapat"
        >
          {isOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
        </button>

      </div>

      {/* Mobil Tam Ekran Açılır Menü (Yumuşak Fade-in Animasyonlu) */}
      <div className={`${styles.mobileMenuOverlay} ${isOpen ? styles.active : ''}`}>
        <div className={styles.mobileMenuContent}>
          <nav className={styles.mobileNavLinks}>
            <Link href="/hakkimizda" className={styles.mobileNavLink} onClick={closeMenu}>Hakkımızda</Link>
            <Link href="/mobil-uygulama" className={styles.mobileNavLink} onClick={closeMenu}>Mobil Uygulama</Link>
            <Link href="/sikca-sorulan-sorular" className={styles.mobileNavLink} onClick={closeMenu}>S.S.S</Link>
            <Link href="/iletisim" className={styles.mobileNavLink} onClick={closeMenu}>İletişim</Link>
          </nav>

          <div className={styles.mobileNavActions}>
            {isAuthenticated ? (
              <Link href="/panel" className={styles.primaryButton} onClick={closeMenu}>
                Platforma Git
                <ArrowRight className={styles.buttonArrowIcon} aria-hidden="true" />
              </Link>
            ) : (
              <>
                <Link href="/giris-yap" className={styles.secondaryButton} onClick={closeMenu}>
                  Platforma Giriş
                </Link>
                <Link href="/kayit-ol" className={styles.primaryButton} onClick={closeMenu}>
                  Hemen Başla
                  <ArrowRight className={styles.buttonArrowIcon} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}