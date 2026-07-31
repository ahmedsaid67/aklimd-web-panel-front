import styles from './page.module.css';
import { X, Calendar, Trash2, CalendarPlus } from 'lucide-react';
import { useState,useEffect,useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('tr');

export default function Page({ closeModal, initialValue, onSave }) {
    const minDate = dayjs('2026-01-01');
    const maxDate = dayjs('2050-12-31');

    const [inputValue, setInputValue] = useState(initialValue || []);
    const [isOpen, setIsOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const calendarPupupRef = useRef(null);

    // Kaydet butonu
    const handleSave = () => {
        if (onSave("hatirlatmaTarihleri", inputValue)) {
            closeModal();
        }
    };

    // Takvimden tarih seçildiğinde (Ekle veya Güncelle)
    const handleDateSelect = (newValue) => {
        setInputValue(prev => {
            if (editIndex !== null) {
                const updated = [...prev];
                updated[editIndex] = newValue;
                return updated;
            }
            return [...prev, newValue];
        });
        setIsOpen(false);
    };


    useEffect(() => {
        function handleClickOutside(event) {
            if (
                calendarPupupRef.current &&
                !calendarPupupRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div onClick={closeModal} className={styles.closeContainer}>
                    <X size={20} strokeWidth={2.5} />
                </div>
                <div className={styles.tarihTotelContainer}>
                    <div className={styles.tarihTotel}>
                        {inputValue.length > 0 ? `Toplam ${inputValue.length} tarih eklendi` : "Henüz eklenmedi"}
                    </div>
                </div>
            </div>

            <div className={styles.bodyContainer}>
                {inputValue.length === 0 && (
                    <div className={styles.emptyText}>Yeni hatırlatma tarihi eklemek için aşağıdaki "Tarih Ekle" butonuna basabilirsiniz.</div>
                )}

                <div className={styles.tarihlerContainer}>
                    {inputValue.map((tarih, index) => (
                        <div key={index} className={styles.tarihContainer} onClick={() => { setEditIndex(index); setIsOpen(true); }} >
                            <div className={styles.leftContainer}>
                                <Calendar size={20} strokeWidth={2.5} />
                                <div className={styles.text}>{dayjs(tarih).format("DD.MM.YYYY")}</div>
                            </div>
                            <div onClick={(e) => { 
                                e.stopPropagation(); 
                                setInputValue(prev => prev.filter((_, i) => i !== index));
                            }}>
                                <Trash2 size={20} strokeWidth={2.5} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.butonlarContainer}>
                    <button onClick={() => { setEditIndex(null); setIsOpen(true); }} className={styles.tarihButton}>
                        <CalendarPlus size={18}/> Tarih Ekle
                    </button>
                    <button disabled={inputValue.length === 0} onClick={handleSave} className={styles.kaydetButton}>Kaydet</button>
                </div>
            </div>

            {isOpen && (
                <div className={styles.calendarPopup} ref={calendarPupupRef}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                        <DateCalendar
                            value={editIndex !== null ? dayjs(inputValue[editIndex]) : null}
                            onChange={handleDateSelect}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </LocalizationProvider>
                </div>
            )}
        </div>
    );
}