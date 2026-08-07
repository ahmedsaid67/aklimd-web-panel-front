'use client';

import { useEffect } from 'react';
import styles from './page.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BottomSheet({ setOptions, item, deleteHandle }) {

    const controls = useAnimation();
    const router = useRouter();

    const closeSheet = async () => {
        await controls.start({
            y: '101%',
            transition: {
                duration: 0.35,
                ease: 'easeOut',
            },
        });

        setOptions(null);
    };

    const handleDragEnd = (_, info) => {
        if (info.offset.y > 120 || info.velocity.y > 700) {
            closeSheet();
        } else {
            controls.start({
                y: 0,
                transition: {
                    type: 'spring',
                    stiffness: 450,
                    damping: 45,
                    mass: 0.8,
                    bounce: 0,
                },
            });
        }
    };

    useEffect(() => {
        controls.set({ y: '101%' });

        controls.start({
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 450,
                damping: 45,
                mass: 0.8,
                bounce: 0,
            },
        });
    }, [controls]);




    return (
        <div
            className={styles.mainContainer}
            onClick={closeSheet}
        >
            <motion.div
                className={styles.pupupContainer}
                onClick={(e) => e.stopPropagation()}
                initial={{ y: '101%' }}
                animate={controls}
                transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 45,
                    mass: 0.8,
                    bounce: 0,
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
            >
                <div className={styles.ustTabContainer}>
                    <div className={styles.ustTab}></div>
                </div>
                <div className={styles.title}>{item.arac_no}</div>
                <div className={styles.infoContainer}>
                    <div>
                        <div className={styles.infoTitle}>
                            Hatırlatıcı Türü
                        </div>
                        <div className={styles.infoText}>
                            {item.hatirlatma_turu}
                        </div>
                    </div>
                    <div>
                        <div className={styles.infoTitle}>
                            Son Tarih
                        </div>
                        <div className={styles.infoText}>
                            {new Date(item.son_tarih).toLocaleDateString('tr-TR')}
                        </div>
                    </div>
                    <div>
                        <div className={styles.infoTitle}>
                            Hatırlatıcı Durumu
                        </div>
                        <div className={styles.infoText}>
                            {item.durum ? "Aktif" : "Pasif"}
                        </div>
                    </div>
                    
                </div>

                <Link className={styles.tarihlerButton} onClick={() => setOptions(null)} href={`/panel/hatirlaticilar/${item.id}`}>Hatırlatma Tarihlerini Görüntüle</Link>
                <div className={styles.deleteButton} onClick={()=>deleteHandle(item.id)}>Hatırlatıcıyı Sil</div>

            </motion.div>
        </div>
    );
}