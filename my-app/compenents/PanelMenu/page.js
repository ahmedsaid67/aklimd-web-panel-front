'use client';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';
import { 
  Home, LayoutGrid, Bell, CreditCard, BookOpen, 
  HelpCircle, Mail, UserCog, ReceiptText, LogOut
} from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Ana Sayfa", icon: <Home size={20} />, link: "/panel" },
    { name: "Araçlar", icon: <LayoutGrid size={20} />, link: "/panel/araclar" },
    { name: "Hatırlatıcılar", icon: <Bell size={20} />, link: "/panel/hatirlaticilar" },
    { name: "Paketler", icon: <CreditCard size={20} />, link: "/panel/paketler" },
    { name: "Faturalar", icon: <ReceiptText size={20} />, link: "/panel/faturalar" },
    { name: "Kullanım Klavuzu", icon: <BookOpen size={20} />, link: "/panel/kullanim-klavuzu" },
    { name: "Sıkça Sorulan Sorular", icon: <HelpCircle size={20} />, link: "/panel/sikca-sorulan-sorular" },
    { name: "Bize Ulaşın", icon: <Mail size={20} />, link: "/panel/bize-ulasin" },
    { name: "Hesap Bilgileri", icon: <UserCog size={20} />, link: "/panel/hesap-bilgileri" },
    { name: "Çıkış Yap", icon: <LogOut size={20} />, link: "/panel/cikis-yap", danger: true },
  ];

  return (
    <>
      <div className={styles.headerContainer}>
        <img className={styles.headerLogo} src='/aklimda-logo.png' alt="Logo" />
        <div className={styles.headerTitle}>AKLIMDA</div>
      </div>

      <div className={styles.menuGroup}>
        <div className={styles.menuTitle}>MENÜ</div>
        {menuItems.slice(0, 3).map((item, index) => (
          <Link 
            key={index}
            className={`${styles.menuTab} ${pathname === item.link ? styles.active : ''}`}
            href={item.link}
          >
            {item.icon}
            <span className={styles.menuText}>{item.name}</span>
          </Link>
        ))}
      </div>

      <div className={styles.menuGroup}>
        <div className={styles.menuTitle}>DETAYLAR</div>
        {menuItems.slice(3).map((item, index) => (
          <Link 
            key={index + 3}
            className={`${styles.menuTab} ${item.danger ? styles.dangerTab : ''} ${pathname === item.link ? styles.active : ''}`}
            href={item.link}
          >
            {item.icon}
            <span className={styles.menuText}>{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}