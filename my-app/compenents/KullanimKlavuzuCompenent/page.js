'use client';
import styles from "./page.module.css";
import { Play,X } from 'lucide-react';
import { useState } from "react";

export default function Page (){

    const [isOpen,setIsOpen] = useState(false)


    return (
        <>
        <div className={styles.mainContainer} onClick={()=>setIsOpen(true)}>
            <img
                src="/tanitim-kapak.png"
                alt="Tanıtım Kapak"
                className={styles.image}
            />
            <div className={styles.playButton}>
                <Play className={styles.playIcon} strokeWidth={2.5} color="#fff" />
            </div>
        </div>

        {isOpen && (
            <div className={styles.pupupContainer}>
                <div className={styles.topContainer}>
                    <div className={styles.closeIconContainer} onClick={()=>setIsOpen(false)}>
                        <X className={styles.closeIcon} strokeWidth={2.5} color="#fff" />
                    </div>
                </div>
                <div className={styles.bodyContainer}>
                    <div className={styles.videoContainer}>
                        <video
                            className={styles.video}
                            src="/kullanim-klavuzu-aklimda-web.mp4"
                            controls
                            autoPlay
                            playsInline
                        />
                    </div>
                </div>
            </div>
        )}
        </>
    )
}