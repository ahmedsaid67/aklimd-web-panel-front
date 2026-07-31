'use client';
import { Menu, User, X, Home, LayoutGrid, Bell, CreditCard, BookOpen, HelpCircle, Mail } from "lucide-react";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './page..module.css'; // Sadece layout için kullanabilirsin

export default function Page() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { name: "Ana Sayfa", icon: <Home size={20} />, link: "/panel" },
        { name: "Araçlar", icon: <LayoutGrid size={20} />, link: "/panel/araclar" },
        { name: "Hatırlatıcılar", icon: <Bell size={20} />, link: "/panel/hatirlaticilar" },
        { name: "Paketler", icon: <CreditCard size={20} />, link: "/panel/paketler" },
        { name: "Kullanım Klavuzu", icon: <BookOpen size={20} />, link: "/panel/kullanim-klavuzu" },
        { name: "Sıkça Sorulan Sorular", icon: <HelpCircle size={20} />, link: "/panel/sikca-sorulan-sorular" },
    ];

    return (
        <>
            {/* Menü Kapalıysa Barı Göster */}
            {!isMenuOpen && (
                <div className={styles.barContainer}>
                    <div onClick={() => setIsMenuOpen(true)}>
                        <Menu size={24} />
                    </div>
                    <div className={styles.userContainer}>
                        <User color='#fff' size={24} />
                    </div>
                </div>
            )}

            {/* Menü Açıksa Menüyü Göster */}
            {isMenuOpen && (
                <div className={styles.menuContainer}>
                    <div className={styles.headerMainContainer}>
                        <div className={styles.headerContainer}>
                            <img className={styles.headerLogo} src='/aklimda-logo.png' alt="Logo" />
                            <div className={styles.headerTitle}>AKLIMDA</div>
                        </div>
                        <div onClick={() => setIsMenuOpen(false)}>
                            <X size={24} />
                        </div>
                    </div>

                    <div className={styles.bodyContainer}>
                        {menuItems.map((item, index) => (
                            <Link 
                                key={index}
                                className={`${styles.menuTab} ${pathname === item.link ? styles.active : ''}`}
                                href={item.link}
                                onClick={()=>setIsMenuOpen(false)}
                            >
                                {item.icon}
                                <div className={styles.menuText}>{item.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}