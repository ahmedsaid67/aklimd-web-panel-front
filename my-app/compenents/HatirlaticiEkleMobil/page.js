'use client';

import styles from './page.module.css';
import { ChevronRight, Minus } from 'lucide-react';
import { useState, useEffect,useRef } from 'react';
import HatirlaticiTuruSelectCompenent from '../HatirlaticiTuruSelectCompenent/page';
import AracNoSelectCompenent from '../AracNoSelectCompenent/page'
import TarihWarningModal from "../TarihWarnings/page";
import HatirlatmaTarihiEkleCompenent from '../../compenents/HatirlatmaTarihiEkleCompenent/page'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Eklentileri aktif et (bunu genelde main.js veya dayjs'i konfigüre ettiğiniz yerde bir kez yaparsınız)
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('tr');

export default function Page ({araclar}){

    const minDate = dayjs('2026-01-01');
    const maxDate = dayjs('2050-12-31');

    const [aracNoOpen,setAracNoOpen] = useState(false)
    const [hatirlatmaTuruOpen,setHatirlatmaTuruOpen] = useState(false)
    const [sonTarihOpen,setSonTarihOpen] = useState(false)
    const [hatirlatmaTarihleriOpen,setHatirlatmaTarihleriOpen] = useState(false)
    const [tarihMessega,setTarihMessega] = useState(null)
    const calendarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target)
            ) {
                setSonTarihOpen(false);
            }
        }

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, []);


    const [data,setData] = useState ({
        arac:null,
        hatirlaticiTuru:null,
        sonTarih:"",
        hatirlatmaTarihleri:[]
    })


    const [loading,setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const handleDataUpdate = (key, value) => {

        if (key === "sonTarih"){
            const trBugun = dayjs().tz("Europe/Istanbul").startOf('day');
            const secilenGunStr = dayjs(value).format('YYYY-MM-DD');
            const trBugunStr = trBugun.format('YYYY-MM-DD');

            if (secilenGunStr <= trBugunStr) {
                setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Türkiye saatine göre bugün ve önceki tarihler seçilemez. Lütfen bugünden sonraki bir tarih seçiniz."});
                return false;
            }
            setData(prev => ({ ...prev, [key]: value }));
            return true;
        }else if (key === "hatirlatmaTarihleri") {

            if (!data.sonTarih){
                setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Hatırlatma tarihi ekleyebilmek için önce son tarihi belirlemelisiniz."}); 
                return false;
            }

            console.log("value:",value)

            const trBugun = dayjs().tz("Europe/Istanbul").startOf('day');
            const trBugunStr = trBugun.format('YYYY-MM-DD');

            const res = value.filter((deger) =>{
                const secilenGunStr = dayjs(deger).format('YYYY-MM-DD');
                return secilenGunStr <= trBugunStr
            })

            if (res.length > 0) {
                setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Türkiye saatine göre bugün veya önceki tarihlere ait hatırlatma tarihi tespit edildi. Lütfen tüm hatırlatma tarihlerinin bugünden sonraki bir tarih olduğundan emin olunuz."});
                return false
            }


            const sonTarihStr = dayjs(data.sonTarih).format('YYYY-MM-DD');

            const resSonTarih = value.filter((deger) => {
                const secilenGunStr = dayjs(deger).format('YYYY-MM-DD');
                return secilenGunStr > sonTarihStr;
            } )

            if (resSonTarih.length>0) {
                setTarihMessega({
                    title: "İşlem Kısıtlaması",
                    explanation: "Son tarihi aşan bir hatırlatma tarihi tespit edildi. Lütfen tüm hatırlatma tarihlerinin son tarihle aynı veya daha önceki bir tarih olduğundan emin olunuz."
                });
                return false;
            }


            const status = value.filter((tarih, index, self) => 
                // Tarihlerin 'YYYY-MM-DD' formatına göre karşılaştırılması daha sağlıklı olur
                self.findIndex(t => dayjs(t).format('YYYY-MM-DD') === dayjs(tarih).format('YYYY-MM-DD')) !== index
            );
            if (status.length>0) {
                setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Hatırlatma tarihleri arasında yinelenen tarihler bulunmaktadır. Lütfen her tarihi yalnızca bir kez ekleyiniz."});
                return false;
            }

            setData((prev) => ({
                ...prev,
                hatirlatmaTarihleri: value,
            }));
            return true;

        }else{
            setData(prev => ({ ...prev, [key]: value }));
            return true;
        }
  
    };



    const createHandle = async() => {
        setLoading(true)
        const response = await AracEkle(data)
        if(response?.success){
            setIsModalOpen(true)
            setData({
                arac:null,
                hatirlaticiTuru:null,
                sonTarih:"",
                hatirlatmaTarihleri:[]
            })
        }
        setLoading(false)

    }

    const hatirlatmaTarihleriPupupOpen = () =>{
        if(!data.sonTarih){
            return setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Hatırlatma tarihi ekleyebilmek için önce son tarihi belirlemelisiniz."});
        }
        setHatirlatmaTarihleriOpen(true)
    }


    return(
        <div className={styles.mainContainer}>
            <div className={styles.mainCard}>
                <div className={styles.label}>Araç No</div>
                <div onClick={()=>{setAracNoOpen(true)}} className={styles.cardContainer}>
                    {data.arac ? (
                        <div className={styles.cardText}>{data.arac.arac_no}</div>
                    ):(
                        <Minus className={styles.treeIcon} size={18} />
                    )}
                    <button className={styles.elemanRight}>
                        <ChevronRight size={18}/>
                    </button>
                </div>
                <div  className={styles.label}>Hatırlatıcı Türü</div>
                <div onClick={()=>{setHatirlatmaTuruOpen(true)}} className={styles.cardContainer}>
                    {
                        data.hatirlaticiTuru ? (
                            <div className={styles.cardText}>{data.hatirlaticiTuru.name}</div>
                        ) : (
                            <Minus className={styles.treeIcon} size={18} />
                        )
                    }
                    <button className={styles.elemanRight}>
                        <ChevronRight size={18}/>
                    </button>
                </div>
                <div className={styles.label}>Son Tarih</div>
                <div onClick={()=>{setSonTarihOpen(true)}} className={styles.cardContainer}>
                    {
                        data.sonTarih ? (
                            <div className={styles.cardText}>{dayjs(data.sonTarih).format("DD.MM.YYYY")}</div>
                        ) : (
                            <Minus className={styles.treeIcon} size={18} />
                        )
                    }
                    
                    <button className={styles.elemanRight}>
                        <ChevronRight size={18}/>
                    </button>
                </div>
                <div className={styles.label}>Hatırlatma Tarihleri</div>
                <div
                    onClick={hatirlatmaTarihleriPupupOpen}
                    className={styles.cardContainer}
                >
                    {data.hatirlatmaTarihleri.length > 0 ? (
                        <div className={styles.cardText}>
                            {data.hatirlatmaTarihleri
                                .map(tarih => dayjs(tarih).format("DD.MM.YYYY"))
                                .join(", ")}
                        </div>
                    ) : (
                        <Minus className={styles.treeIcon} size={18} />
                    )}

                    <button className={styles.elemanRight}>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
            <button
                onClick={createHandle}
                disabled={
                    loading ||
                    !data.arac ||
                    !data.hatirlaticiTuru ||
                    !data.sonTarih || 
                    !data.hatirlatmaTarihleri.length>0
                }
                className={styles.ekleButton}
            >
                Hatırlatıcı Oluştur
            </button>

            {hatirlatmaTuruOpen && (
                <HatirlaticiTuruSelectCompenent 
                    closeModal={()=>setHatirlatmaTuruOpen(false)}
                    initialValue={data.hatirlaticiTuru} // isOpen true ise type da bellı edılıyor, inputHandle baglı olarak aslında rısk yok.
                    onSave={(type,value) => handleDataUpdate(type, value)}
                />
            )}

            {aracNoOpen && (
                <AracNoSelectCompenent 
                    closeModal={()=>setAracNoOpen(false)}
                    initialValue={data.arac} // isOpen true ise type da bellı edılıyor, inputHandle baglı olarak aslında rısk yok.
                    araclar={araclar}
                    onSave={(type,value) => handleDataUpdate(type, value)}
                />
            )}

            {sonTarihOpen && (
                <div className={styles.calendarPopup} ref={calendarRef} >
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                        <DateCalendar
                            value={data.sonTarih ? dayjs(data.sonTarih) : null}
                            onChange={(newValue) => {
                                handleDataUpdate("sonTarih",newValue);
                                setSonTarihOpen(false);
                            }}
                            minDate={minDate}
                            maxDate={maxDate}
                            
                        />
                    </LocalizationProvider>
                </div>
            )}

            {hatirlatmaTarihleriOpen && (
                <HatirlatmaTarihiEkleCompenent 
                    closeModal={()=>setHatirlatmaTarihleriOpen(false)}
                    initialValue={data.hatirlatmaTarihleri} 
                    onSave={(type,value) => handleDataUpdate(type, value)}
                />
            )}

            {tarihMessega && <TarihWarningModal setTarihMessega={setTarihMessega} tarihMessega={tarihMessega}/>}
        </div>
    )
}