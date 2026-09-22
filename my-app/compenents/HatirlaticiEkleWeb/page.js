'use client'
import { useState, useRef, useEffect } from "react";
import styles from './page.module.css';
import { ChevronDown, Calendar, Search } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';
import TarihWarningModal from "../TarihWarnings/page";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { hatirlaticiKaydet } from "./actions";
import NoCreditRes from "../NoCreditRes/page";


// Eklentileri aktif et (bunu genelde main.js veya dayjs'i konfigüre ettiğiniz yerde bir kez yaparsınız)
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('tr');

export default function HatirlaticiEkleWeb({araclar}) {
    const [yeniTarih, setYeniTarih] = useState('');
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownSonTarihRef = useRef(null);
    const dropdownHatirlatmaTarihRef = useRef(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openDatesPicker, setOpenDatesPicker] = useState(false);
    const [loading,setLoading] = useState(false)
    const [formData,setFormData] = useState({
        arac:null,
        hatirlaticiTuru:null,
        sonTarih:"",
        hatirlatmaTarihleri:[]
    })
    const [tarihMessega,setTarihMessega] = useState(null)
    const [openCreditModal,setOpenCreditModal] = useState(false)

    const dataAdd = (type, data) => {
        if (["arac", "hatirlaticiTuru"].includes(type)) {
            setFormData(prev => ({
                ...prev,
                [type]: data,
            }));
        } else if (type === "sonTarih"){

            const trBugun = dayjs().tz("Europe/Istanbul").startOf('day');
            const secilenGunStr = dayjs(data).format('YYYY-MM-DD');
            const trBugunStr = trBugun.format('YYYY-MM-DD');

            if (secilenGunStr <= trBugunStr) {
                setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Türkiye saatine göre bugün ve önceki tarihler seçilemez. Lütfen bugünden sonraki bir tarih seçiniz."});
                return;
            }

            setFormData(prev => ({
                ...prev,
                [type]: data,
            }));
        }else if (type === "hatirlatmaTarihleri") {
            console.log("data:",data)
            setFormData(prev => {

                if (!prev.sonTarih){
                    setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Hatırlatma tarihi ekleyebilmek için önce son tarihi belirlemelisiniz."});
                    return  prev;
                }

                const trBugun = dayjs().tz("Europe/Istanbul").startOf('day');
                const secilenGunStr = dayjs(data).format('YYYY-MM-DD');
                const trBugunStr = trBugun.format('YYYY-MM-DD');

                if (secilenGunStr <= trBugunStr) {
                    setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Türkiye saatine göre bugün ve önceki tarihler seçilemez. Lütfen bugünden sonraki bir tarih seçiniz."});
                    return prev;
                }


                const sonTarihStr = dayjs(prev.sonTarih).format('YYYY-MM-DD');

                if (secilenGunStr > sonTarihStr) {
                    setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Hatırlatma tarihi, son tarihten ileri bir tarih olamaz. Lütfen son tarihle aynı veya daha önceki bir tarih seçiniz."});
                    return prev;
                }


                const status = prev.hatirlatmaTarihleri.some(date => dayjs(date).isSame(data, 'day'));
                if (status) {
                    setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Aynı hatırlatma tarihi birden fazla kez eklenemez."});
                    return  prev;
                }

                return {
                    ...prev,
                    hatirlatmaTarihleri: [...prev.hatirlatmaTarihleri, data],
                };
            });
        }
    };
    

    const minDate = dayjs('2026-01-01');
    const maxDate = dayjs('2050-12-31');


    const hatirlaticiTuru = [
        { number: 1, name: "Muayene", code: "muayene" },
        { number: 2, name: "Sigorta", code: "sigorta" },
        { number: 3, name: "Vergi", code: "vergi" },
        { number: 4, name: "Kasko", code: "kasko" },
    ];

    const [turOpen, setTurOpen] = useState(false);
    const dropdownTurRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredAraclar = araclar.filter((arac) => {
        const searchLower = searchTerm.toLowerCase();
        const aracNo = arac.arac_no?.toLowerCase() || "";
        return aracNo.includes(searchLower);
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
            if (dropdownTurRef.current && !dropdownTurRef.current.contains(event.target)) {
                setTurOpen(false);
            }
            if (dropdownSonTarihRef.current && !dropdownSonTarihRef.current.contains(event.target)) {
                setOpenDatePicker(false);
            }
            if (dropdownHatirlatmaTarihRef.current && !dropdownHatirlatmaTarihRef.current.contains(event.target)) {
                setOpenDatesPicker(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const tarihCikar = (tarihCikarilacak) => {
        setFormData(prev => ({
            ...prev, hatirlatmaTarihleri:prev.hatirlatmaTarihleri.filter(t => t !== tarihCikarilacak)
        }))
    };


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        if (!formData.arac){
            setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Lütfen bir araç seçiniz."});
            setLoading(false);
            return;
        }
        if (!formData.hatirlaticiTuru){
            setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Lütfen hatırlatıcı türünü seçiniz."});
            setLoading(false);
            return;
        }
        if (!formData.sonTarih){
            setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Lütfen son tarihi belirleyiniz."});
            setLoading(false);
            return;
        }
        if(formData.hatirlatmaTarihleri.length === 0){
            setTarihMessega({"title":"İşlem Kısıtlaması","explanation":"Lütfen en az bir hatırlatma tarihi ekleyiniz."});
            setLoading(false);
            return;
        }

        const sonTarihStr = dayjs(formData.sonTarih).format('YYYY-MM-DD');
        
        const hatirlatmaTarihleriGecersiz = formData.hatirlatmaTarihleri.some(tarih => {
            const hatirlatmaStr = dayjs(tarih).format('YYYY-MM-DD');
            return hatirlatmaStr > sonTarihStr;
        });

        if (hatirlatmaTarihleriGecersiz) {
            setTarihMessega({
                "title": "İşlem Kısıtlaması", 
                "explanation": "Belirlediğiniz son tarihten daha ileri bir tarihe ait hatırlatma tarihi bulunmaktadır. Hatırlatma tarihi son tarihle aynı veya daha önceki bir tarih olmalıdır. Lütfen kontrol ediniz."
            });
            setLoading(false);
            return;
        }

  


        const payload = {
            arac_id: formData.arac.id,
            hatirlatma_turu: formData.hatirlaticiTuru.code,
            son_tarih: dayjs(formData.sonTarih).format('YYYY-MM-DD'),
            hatirlatma_tarihleri: formData.hatirlatmaTarihleri.map(tarih => ({
                tarih: dayjs(tarih).format('YYYY-MM-DD')
            }))
        };


        const result = await hatirlaticiKaydet(payload);
        //console.log("result:",result)
        // Sunucudan gelen mesajı modal ile göster
        if (result.success) {
            setTarihMessega({"title":"İşlem Başarılı","explanation":result.message});
            // Başarılı ise formu sıfırla
            setFormData({
                arac: null,
                hatirlaticiTuru: null,
                sonTarih: "",
                hatirlatmaTarihleri: []
            });
        }else{
            if(result.message==="Yeterli krediniz yok. Hatırlatıcı oluşturulamadı."){
                setOpenCreditModal(true)
            }
        }

        setLoading(false);

    }




    return (
        <div className={styles.mainContainer}>
            <div className={styles.formCard} >
                <div className={styles.formHeaderWrapper}>
                    <h2 className={styles.formHeaderTitle}>Yeni Hatırlatıcı Oluşturma</h2>
                </div>
                
                <div className={styles.gridContainer}>
                    {/* Araç Seçimi */}
                    <div className={styles.inputGroup} ref={dropdownRef}>
                        <label className={styles.label}>Araç Seçimi</label>
                        <div
                            className={`${styles.inputContainer} ${open ? styles.inputActivate : ""}`}
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <input
                                type="text"
                                readOnly
                                value={formData.arac?.arac_no || ""}
                                placeholder="Araç Seç."
                                className={styles.input}
                            />
                            <div className={styles.inputIconContainer}>
                                <ChevronDown className={`${styles.icon} ${open ? styles.iconOpen : ""}`} />
                            </div>
                        </div>

                        {open && (
                            <div className={styles.dropdown}>
                                {araclar.length===0 ? (
                                    <div className={styles.dropdownTextContainer}>
                                        <div className={styles.dropdownText}>
                                            Araç kaydı bulunmamaktadır. Hatırlatıcı oluşturabilmek için öncelikle sistemimize bir araç kaydetmeniz gerekmektedir.
                                        </div>
                                    </div>
                                ):(
                                    <>
                                        <div className={styles.dropdownSearchWrapper}>
                                            <Search className={styles.searchIcon} size={16} strokeWidth={2} />
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                placeholder="Araç No ile ara..."
                                                className={styles.dropdownSearchInput}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                autoFocus
                                            />
                                        </div>
                                        <div className={styles.dropdownList}>
                                            {filteredAraclar.length > 0 ? (
                                                filteredAraclar.map((arac) => (
                                                    <button
                                                        key={arac.id}
                                                        type="button"
                                                        className={`${styles.option} ${formData.arac?.id === arac.id ? styles.optionSelected : ""}`}
                                                        onClick={() => {
                                                            dataAdd("arac",arac);
                                                            setOpen(false);
                                                            setSearchTerm("");
                                                        }}
                                                    >
                                                        <span className={styles.optionTitle}>{arac.arac_no}</span>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className={styles.noResult}>Eşleşen araç bulunamadı</div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Hatırlatıcı Türü */}
                    <div className={styles.inputGroup} ref={dropdownTurRef}>
                        <label className={styles.label}>Hatırlatıcı Türü</label>
                        <div
                            className={`${styles.inputContainer} ${turOpen ? styles.inputActivate : ""}`}
                            onClick={() => setTurOpen((prev) => !prev)}
                        >
                            <input
                                type="text"
                                readOnly
                                value={formData.hatirlaticiTuru?.name || ""}
                                placeholder="Hatırlatıcı Türü Seç."
                                className={styles.input}
                            />
                            <div className={styles.inputIconContainer}>
                                <ChevronDown className={`${styles.icon} ${turOpen ? styles.iconOpen : ""}`} />
                            </div>
                        </div>

                        {turOpen && (
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownList}>
                                    {hatirlaticiTuru.map((hatirlatici) => (
                                        <button
                                            key={hatirlatici.number}
                                            type="button"
                                            className={`${styles.option} ${formData.hatirlaticiTuru?.number === hatirlatici.number ? styles.optionSelected : ""}`}
                                            onClick={() => {
                                                dataAdd("hatirlaticiTuru",hatirlatici);
                                                setTurOpen(false);
                                            }}
                                        >
                                            <span className={styles.optionTitle}>{hatirlatici.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                   
                    <div className={styles.inputGroup} ref={dropdownSonTarihRef}>
                        <label className={styles.label}>Son Tarih</label>
                        <div
                            className={`${styles.inputContainer} ${openDatePicker ? styles.inputActivate : ""}`}
                            onClick={() => setOpenDatePicker((prev) => !prev)}
                        >
                            <input
                                type="text"
                                readOnly
                                value={formData.sonTarih ? dayjs(formData.sonTarih).format("DD.MM.YYYY") : ""}
                                placeholder="gg.aa.yyyy"
                                className={styles.input}
                            />
                            <div className={styles.inputIconContainer}>
                                <Calendar className={`${styles.icon} ${openDatePicker ? styles.iconOpenDate : ""}`} />
                            </div>
                        </div>

                        {openDatePicker && (
                            <div className={styles.calendarPopup}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                                    <DateCalendar
                                        value={formData.sonTarih ? dayjs(formData.sonTarih) : null}
                                        onChange={(newValue) => {
                                            dataAdd("sonTarih",newValue);
                                            setOpenDatePicker(false);
                                        }}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        
                                    />
                                </LocalizationProvider>
                            </div>
                        )}
                    </div>

                    {/* Hatırlatma Tarihleri Ekleme Grubu */}
                    <div className={styles.inputGroup} ref={dropdownHatirlatmaTarihRef}>
                        <label className={styles.label}>Hatırlatma Tarihleri</label>
                        <div className={styles.addActionRow}>
                            <div
                                className={`${styles.inputContainer} ${openDatesPicker ? styles.inputActivate : ""}`}
                                onClick={() => setOpenDatesPicker((prev) => !prev)}
                            >
                                <input
                                    type="text"
                                    readOnly
                               
                                    value={yeniTarih ? dayjs(yeniTarih).format("DD.MM.YYYY") : ""}
                                    placeholder="gg.aa.yyyy"
                                    className={styles.input}
                                />
                                <div className={styles.inputIconContainer}>
                                    <Calendar className={`${styles.icon} ${openDatesPicker ? styles.iconOpenDate : ""}`} />
                                </div>
                            </div>
                            <button 
                                type="button" 
                                onClick={()=>{
                                    if(yeniTarih){
                                        dataAdd("hatirlatmaTarihleri",yeniTarih)
                                        setYeniTarih("")
                                    }
                                }} 
                                disabled={!yeniTarih}
                                className={styles.addButton}>
                                Ekle
                            </button>
                        </div>
                        {openDatesPicker && (
                            <div className={styles.calendarPopup}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                                    <DateCalendar
                                        value={yeniTarih ? dayjs(yeniTarih, "DD.MM.YYYY") : null}
                                        onChange={(newValue) => {
                                            // Seçilen Day.js nesnesini string formata çevirerek kaydediyoruz
                                            setYeniTarih(newValue);
                                            setOpenDatesPicker(false);
                                        }}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                    />
                                </LocalizationProvider>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sabit Alanlı ve Kaydırılabilir Tag Cloud Bölümü */}
                <div className={styles.tarihSection}>
                    <div className={styles.tarihSectionHeader}>
                        <span className={styles.tarihBaslik}>Planlanan Hatırlatma Tarihleri</span>
                        <span className={styles.tarihSayac}>
                            {formData.hatirlatmaTarihleri.length === 0 ? "Henüz eklenmedi" : `Toplam ${formData.hatirlatmaTarihleri.length} tarih eklendi`}
                        </span>
                    </div>
                    
                    <div className={styles.scrollableBadgeContainer}>
                        {formData.hatirlatmaTarihleri.length === 0 ? (
                            <span className={styles.emptyText}>Yukarıdaki alandan tarih seçip &quot;Ekle&quot; butonuna basarak liste oluşturabilirsiniz.</span>
                        ) : (
                            formData.hatirlatmaTarihleri.map((tarih, index) => (
                                <div key={index} className={styles.tarihBadge}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <span>{dayjs(tarih).format("DD.MM.YYYY")}</span>
                                    <button type="button" onClick={() => tarihCikar(tarih)} className={styles.removeBadge} title="Kaldır">×</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className={styles.footer}>
                    <button onClick={handleSubmit} disabled={loading} className={styles.saveButton}>Hatırlatıcı Oluştur</button>
                </div>
            </div>
            {tarihMessega && <TarihWarningModal setTarihMessega={setTarihMessega} tarihMessega={tarihMessega}/>}
            {openCreditModal && <NoCreditRes setOpenCreditModal={setOpenCreditModal} openCreditModal={openCreditModal}/>}
        </div>
    );
}