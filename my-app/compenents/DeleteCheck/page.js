'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function Page({ deleteHandle, setStatusDeleteCheck }) {
    const [result, setResult] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteFunc = async () => {
        setIsDeleting(true);
        // 1 saniyelik yapay gecikme
        await new Promise(resolve => setTimeout(resolve, 1000));
        
 
        const data = await deleteHandle();
        if (data){
            setResult(data)
        }else{
            // frontendde bir 400 hatası düşmeyecek şekilde kodladım bundan dolayı buraya düşmeyecek null değeri dönmeyecek, bunu öylesıne yazdım.
            setResult('Bir şeyler ters gitt daha tekrar sonra deneyiniz.')
        }

        setIsDeleting(false);

    };

    return (
        <div className={styles.overlay} onClick={() => setStatusDeleteCheck(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                
                {/* 1. Yükleme Durumu */}
                {isDeleting ? (
                    <div className={styles.content}>
                        <div className={styles.spinner}></div>
                        <p className={styles.statusText}>Siliniyor...</p>
                    </div>
                ) : result ? (
                    // 2. Sonuç Durumu
                    <div className={styles.content}>
                        <div className={styles.resultIcon}>✓</div>
                        <p className={styles.resultText}>{result}</p>
                        <button className={styles.buttonClose} onClick={() => setStatusDeleteCheck(false)}>
                            Kapat
                        </button>
                    </div>
                ) : (
                    // 3. Onay Durumu
                    <div className={styles.content}>
                        <h2 className={styles.title}>Silme Onayı</h2>
                        <p className={styles.desc}>Seçili öğeleri kalıcı olarak silmek istiyor musunuz?</p>
                        <div className={styles.buttonContainer}>
                            <button className={styles.btnCancel} onClick={() => setStatusDeleteCheck(false)}>İptal</button>
                            <button className={styles.btnDelete} onClick={deleteFunc}>Evet, Sil</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}