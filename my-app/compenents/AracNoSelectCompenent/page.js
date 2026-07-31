import styles from './page.module.css';
import { X, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Page({ closeModal, initialValue, araclar, onSave }) {

    const [inputValue, setInputValue] = useState(initialValue);

    const handleSave = () => {
        onSave("arac", inputValue);
        closeModal();
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div onClick={closeModal} className={styles.closeContainer}>
                    <X size={20} strokeWidth={2.5} />
                </div>

                <button
                    onClick={handleSave}
                    className={styles.kaydetButton}
                    disabled={!inputValue}
                >
                    <div className={styles.kaydetText}>Seç</div>
                </button>
            </div>

            <div className={styles.listContainer}>
                {araclar.map((item) => (
                    <div
                        key={item.id}
                        className={styles.list}
                        onClick={() => setInputValue(item)}
                    >

                        <div className={styles.text}>{item.arac_no}</div>

                        {inputValue?.id === item.id && (
                            <CheckCircle2
                                size={20}
                                className={styles.selectedIcon}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}