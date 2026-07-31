import styles from './page.module.css';
import { X } from 'lucide-react';
import {useState} from 'react';

export default function Page ({closeModal,type,initialValue,onSave}) {

    const [inputValue,setInputValue] = useState(initialValue)

    const handleSave = () =>{
        onSave(inputValue)
        closeModal()
    }
    

    return(
        <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div onClick={closeModal} className={styles.closeContainer}>
                    <X size={20} strokeWidth={2.5}/>
                </div>
                <button onClick={handleSave} className={styles.kaydetButton} disabled={!inputValue.trim()}>
                    <div className={styles.kaydetText}>Kaydet</div>
                </button>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.inputTitle}>
                    {type == 'aracMarkasi'
                            ? "Araç Markası"
                            : type === 'aracModeli'
                                ? "Araç Modeli"
                                : "Araç Plakası"}
                </div>
                <textarea
                    className={styles.input}
                    maxLength={30}
                    value={inputValue}
                    onChange={(e)=>setInputValue(e.target.value)}
                    type="text"
                    placeholder={
                        type == 'aracMarkasi'
                            ? "Örn: Toyota"
                            : type === 'aracModeli'
                                ? "Örn: Corolla"
                                : "Örn: 34 ABC 123"
                    }
                />
            </div>
        </div>
    )
}
