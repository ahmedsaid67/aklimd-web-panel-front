'use client';

import { useEffect } from 'react';
import styles from './page.module.css';
import { motion, useAnimation } from 'framer-motion';
import { Car, Bell, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function BottomSheet({ setOptions, id, deleteHandle }) {

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



    const deleteFunc = async() => {
        deleteHandle(id)
    }

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

                <div onClick={()=>router.push(`/panel/araclar/${id}`)} className={styles.selectedContainer}>
                    <Car size={24} />
                    <div className={styles.selectedText}>
                        Araç Bilgilerini İncele ve Düzenle
                    </div>
                </div>



                <div onClick={deleteFunc} className={styles.selectedContainer}>
                    <Trash2 color='#DC2626' size={24} />
                    <div className={styles.selectedText}>
                        Aracı Sil
                    </div>
                </div>
            </motion.div>
        </div>
    );
}