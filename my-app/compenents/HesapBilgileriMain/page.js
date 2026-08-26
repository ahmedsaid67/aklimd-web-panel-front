'use client';

import styles from './page.module.css';
import Link from 'next/link';
import { useEffect, useRef } from 'react'; // 1. useRef ve useEffect eklendi
import { UserCog, ReceiptText, BarChart3 } from 'lucide-react';
import KullaniciBilgileriWeb from '../KullaniciBilgileriWeb/page';
import FaturaBilgileriWeb from "../FaturaBilgileriWeb/page"
import KullanimOzetiWeb from '../KullanimOzetiWeb/page';

export default function Page({ info, tabUrl }) {
    console.log("tabUrl:", tabUrl);

    // 2. Aktif tab elementini yakalamak için ref tanımlıyoruz
    const activeTabRef = useRef(null);

    // 3. tabUrl değiştiğinde veya sayfa direkt o tab ile açıldığında otomatik ortalayarak kaydırıyoruz
    useEffect(() => {
        if (activeTabRef.current) {
            activeTabRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }, [tabUrl]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.tabContainer}>
                
                <Link 
                    href="?tab=kullanici-bilgileri" 
                    className={`${styles.tab} ${tabUrl === "kullanici-bilgileri" ? styles.activeTab : ""}`}
                    {...(tabUrl === "kullanici-bilgileri" ? { ref: activeTabRef } : {})}
                >
                    <UserCog className={styles.tabIcon} size={20} />
                    <span className={styles.tabText}>Kullanıcı Bilgileri</span>
                </Link>

                <Link 
                    href="?tab=fatura-bilgileri" 
                    className={`${styles.tab} ${tabUrl === "fatura-bilgileri" ? styles.activeTab : ""}`}
                    {...(tabUrl === "fatura-bilgileri" ? { ref: activeTabRef } : {})}
                >
                    <ReceiptText className={styles.tabIcon} size={20} />
                    <span className={styles.tabText}>Fatura Bilgileri</span>
                </Link>

                <Link 
                    href="?tab=kullanim-ozeti" 
                    className={`${styles.tab} ${tabUrl === "kullanim-ozeti" ? styles.activeTab : ""}`}
                    {...(tabUrl === "kullanim-ozeti" ? { ref: activeTabRef } : {})}
                >
                    <BarChart3 className={styles.tabIcon} size={20} />
                    <span className={styles.tabText}>Kullanım Özeti</span>
                </Link>

            </div>

            {
                tabUrl === "kullanici-bilgileri"
                    ? <KullaniciBilgileriWeb info={info} />
                    : tabUrl === "fatura-bilgileri"
                        ? <FaturaBilgileriWeb info={info} />
                        : <KullanimOzetiWeb info={info} />
            }
            
        </div>
    );
}