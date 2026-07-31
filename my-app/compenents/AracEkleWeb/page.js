'use client'
import styles from './page.module.css';
import { useActionState } from 'react';
import { AracEkle } from './actions'
import AraclarCreateRes from '../../compenents/AraclarCreateRes/page'
import { useState, useEffect } from 'react';


export default function AracEkleWeb() {
    const [state, formAction, pending] = useActionState(AracEkle, null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Eğer sunucudan bir yanıt (state) geldiyse modalı aç
        if (state !== null) {
            setIsModalOpen(true);
        }
    }, [state]);


    return (
        <div className={styles.mainContainer}>
            <form action={formAction} className={styles.formCard}>
                <h2 className={styles.formHeader}>Yeni Araç Tanımlama</h2>
                <div className={styles.gridContainer}>
                    <div className={styles.inputGroup}>
                        <label>Araç Markası</label>
                        <input name='aracMarkasi' maxLength={30} type="text" placeholder="Örn: Toyota" className={styles.input} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Araç Modeli</label>
                        <input name='aracModeli' maxLength={30} type="text" placeholder="Örn: Corolla" className={styles.input} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Araç Plakası</label>
                        <input name='aracPlakasi' maxLength={30} type="text" placeholder="34 ABC 123" className={styles.input} required />
                    </div>
                </div>
                <div className={styles.footer}>
                    <button disabled={pending} className={styles.saveButton}>Aracı Ekle</button>
                </div>
            </form>

            {isModalOpen && <AraclarCreateRes setDeleteWarning={setIsModalOpen} />}
        </div>
    )
}