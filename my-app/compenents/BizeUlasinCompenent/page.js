"use client";

import styles from "./page.module.css";
import { useState } from "react";
import {mesajGonder} from './actions'
import BizeUlasinRes from "../BizeUlasinRes/page";

export default function Page() {
    const [mesaj, setMesaj] = useState("");
    const [yanit,setYanit] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(mesaj);
        if(!mesaj){
            return console.log("mesaj boş olamaz")
        }
        const res = await mesajGonder({message:mesaj})

        if(res.success){
            setYanit({"title":"İşlem Başarılı","explanation":res.message})
        }else{
            setYanit({"title":"İşlem Başarısız","explanation":res.message})
        }
        setMesaj("")
    }

    return (
        <div className={styles.bodyContainer}>
            <div className={styles.sectionContainer}>
                <div className={styles.headerWrapper}>
                    <h2 className={styles.subtitle}>Sorularınızı ve Görüşlerinizi Bize İletin</h2>
                </div>
                
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <textarea 
                        id="mesaj" 
                        name="mesaj" 
                        value={mesaj} 
                        onChange={(e) => setMesaj(e.target.value)} 
                        placeholder="Mesajınızı buraya yazın..." 
                        required
                        className={styles.textarea}
                    />

                    <button type="submit" className={styles.submitButton}>
                        Gönder
                    </button>
                </form>
            </div>

            {yanit && <BizeUlasinRes setYanit={setYanit} yanit={yanit} />}
        </div>
    );
}