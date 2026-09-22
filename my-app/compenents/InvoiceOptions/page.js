'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { motion, useAnimation } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

export default function BottomSheet({ setOptions, item, handleDownload }) {

    const controls = useAnimation();
    const [downloadingId, setDownloadingId] = useState(null);

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

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };



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
                <div className={styles.title}>{item.display_invoice_number} {item.package_title}</div>
                
                <div className={styles.infoContainer}>
                    <div>
                        <div className={styles.infoTitle}>Fatura No</div>
                        <div className={styles.infoText}>{item.display_invoice_number}</div>
                    </div>
                    <div>
                        <div className={styles.infoTitle}>Paket Adı</div>
                        <div className={styles.infoText}>{item.package_title}</div>
                    </div>
                    <div>
                        <div className={styles.infoTitle}>Tutar</div>
                        <div className={styles.infoText}>{item.amount} ₺</div>
                    </div>
                    <div>
                        <div className={styles.infoTitle}>Ödeme Tarihi</div>
                        <div className={styles.infoText}>{formatDate(item.paid_at)}</div>
                    </div>
                    <div>
                        <div className={styles.infoTitle}>Fatura Tarihi</div>
                        <div className={styles.infoText}>{formatDate(item.invoice_date)}</div>
                    </div>
                    <div>
                        <div className={styles.infoTitle}>Durum</div>
                        <div className={styles.infoText}>
                            {item.status === "success" ? "Oluşturuldu" : "Bekliyor"}
                        </div>
                    </div>
                </div>

                <div className={styles.actionContainer}>
                    {item.status === 'success' ? (
                        <button 
                            className={styles.downloadButton} 
                            onClick={() => handleDownload(item.id, item.display_invoice_number)}
                            disabled={downloadingId === item.id}
                        >
                            {downloadingId === item.id ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    <span>Fatura İndiriliyor...</span>
                                </>
                            ) : (
                                <>
                                    <Download size={16} />
                                    <span>Fatura İndir</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <button className={styles.disabledDownloadButton} disabled title="Fatura henüz oluşturulmadı">
                            <FileText size={16} />
                            <span>Oluşturulmadı</span>
                        </button>
                    )}
                </div>

            </motion.div>
        </div>
    );
}