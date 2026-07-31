'use client'

import styles from './page.module.css';
import { AracDuzenle } from './actions';
import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import AracUpdateRes from '../AracUpdateRes/page';

export default function Page ({arac}) {
    const [state, formAction, pending] = useActionState(AracDuzenle, null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (state !== null) {
            setIsModalOpen(true);
        }
    }, [state]);


    return (
        <div className={styles.mainContainer}>
            <form action={formAction} className={styles.formCard}>
                <input type="hidden" name="id" value={arac?.id} />
                <h2 className={styles.formHeader}>Araç Bilgilerini İncele ve Düzenle</h2>
                <div className={styles.gridContainer}>
                    <div className={styles.inputGroup}>
                        <label>Araç No</label>
                        <input
                            name="aracNo"
                            type="text"
                            className={styles.input}
                            defaultValue={arac?.arac_no}
                            readOnly // Kullanıcı değiştiremez
                            style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Araç Markası</label>
                        <input
                            name="aracMarkasi"
                            maxLength={30}
                            type="text"
                            placeholder="Örn: Toyota"
                            className={styles.input}
                            defaultValue={arac?.arac_markasi}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Araç Modeli</label>
                        <input
                            name="aracModeli"
                            maxLength={30}
                            type="text"
                            placeholder="Örn: Corolla"
                            className={styles.input}
                            defaultValue={arac?.arac_modeli}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Araç Plakası</label>
                        <input
                            name="aracPlakasi"
                            maxLength={30}
                            type="text"
                            placeholder="34 ABC 123"
                            className={styles.input}
                            defaultValue={arac?.arac_plakasi}
                            required
                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <button disabled={pending} className={styles.saveButton}>Değişiklikleri Kaydet</button>
                </div>
            </form>

            {isModalOpen && <AracUpdateRes setDeleteWarning={setIsModalOpen} />}

        </div>
    )
}