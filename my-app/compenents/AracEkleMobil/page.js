'use client';

import styles from './page.module.css';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import AracEkleInputCompenent from '../../compenents/AracEkleInputCompenent/page'
import { AracEkle } from './actions';
import AraclarCreateRes from '../../compenents/AraclarCreateRes/page'


export default function Page (){

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: null
    });

    const [data,setData] = useState ({
        aracMarkasi:'',
        aracModeli:'',
        aracPlakasi:''
    })

    const [loading,setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const inputHandle =(type)=>{
        setModalConfig({isOpen:true,type})
    }

    const handleDataUpdate = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const closeModal = () => {
        setModalConfig({ isOpen: false, type: null });
    };

    const createHandle = async() => {
        setLoading(true)
        const response = await AracEkle(data)
        if(response?.success){
            setIsModalOpen(true)
            setData({
                aracMarkasi:'',
                aracModeli:'',
                aracPlakasi:''
            })
        }
        setLoading(false)

    }


    return(
        <div className={styles.mainContainer}>
            <div className={styles.mainCard}>
                <div className={styles.label}>Araç Markası</div>
                <div onClick={()=>{inputHandle('aracMarkasi')}} className={styles.cardContainer}>
                    <div className={styles.cardText}>{data.aracMarkasi}</div>
                    <button className={styles.elemanRight}>
                        <ChevronRight size={18}/>
                    </button>
                </div>
                <div  className={styles.label}>Araç Modeli</div>
                <div onClick={()=>{inputHandle('aracModeli')}} className={styles.cardContainer}>
                    <div className={styles.cardText}>{data.aracModeli}</div>
                    <button className={styles.elemanRight}>
                        <ChevronRight size={18}/>
                    </button>
                </div>
                <div className={styles.label}>Araç Plakası</div>
                <div onClick={()=>{inputHandle('aracPlakasi')}} className={styles.cardContainer}>
                    <div className={styles.cardText}>{data.aracPlakasi}</div>
                    <button className={styles.elemanRight}>
                        <ChevronRight size={18}/>
                    </button>
                </div>
            </div>
            <button
                onClick={createHandle}
                disabled={
                    loading ||
                    !data.aracMarkasi.trim() ||
                    !data.aracModeli.trim() ||
                    !data.aracPlakasi.trim()
                }
                className={styles.ekleButton}
            >
                Araç Ekle
            </button>

            {modalConfig.isOpen && (
                <AracEkleInputCompenent 
                    closeModal={closeModal}
                    type={modalConfig.type} 
                    initialValue={modalConfig.type ? data[modalConfig.type] : ''} // isOpen true ise type da bellı edılıyor, inputHandle baglı olarak aslında rısk yok.
                    onSave={(value) => handleDataUpdate(modalConfig.type, value)}
                />
            )}

            {isModalOpen && <AraclarCreateRes setDeleteWarning={setIsModalOpen} />}
        </div>
    )
}