import styles from './page.module.css';
import {
    X,
    Shield,
    CarFront,
    ReceiptText,
    ClipboardCheck,
    CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

export default function Page({ closeModal, initialValue, onSave }) {
    const hatirlaticiTuru = [
        {
            number: 1,
            name: "Muayene",
            code: "muayene",
            icon: <ClipboardCheck size={20} />
        },
        {
            number: 2,
            name: "Sigorta",
            code: "sigorta",
            icon: <Shield size={20} />
        },
        {
            number: 3,
            name: "Vergi",
            code: "vergi",
            icon: <ReceiptText size={20} />
        },
        {
            number: 4,
            name: "Kasko",
            code: "kasko",
            icon: <CarFront size={20} />
        },
    ];

    const [inputValue, setInputValue] = useState(initialValue);

    const handleSave = () => {
        onSave("hatirlaticiTuru", inputValue);
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
                {hatirlaticiTuru.map((item) => (
                    <div
                        key={item.number}
                        className={styles.list}
                        onClick={() => setInputValue(item)}
                    >
                        <div className={styles.left}>
                            <div className={styles.icon}>
                                {item.icon}
                            </div>

                            <div className={styles.text}>{item.name}</div>
                        </div>

                        {inputValue?.number === item.number && (
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