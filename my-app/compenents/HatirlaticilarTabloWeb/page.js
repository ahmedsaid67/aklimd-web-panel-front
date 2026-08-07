'use client';
import styles from './page.module.css';
import { Plus,ChevronLeft, ChevronRight, Trash2, Pencil  } from 'lucide-react';
import { useState,useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteHatirlaticilar } from './actions';
import DeleteCheck from '../DeleteCheck/page'
import AraclarDeleteWarning from '../AraclarDeleteWarning/page';
import HatirlatmaTarihleriListWeb from '../HatirlatmaTarihleriListWeb/page'
import Link from 'next/link';


export default function Page ({hatirlaticilar}){


    const router = useRouter();
    // useState'i şöyle başlat
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('arac_no') || '');
    const itemsPerPage = 10;
    const totalPages = Math.ceil(hatirlaticilar.count / itemsPerPage);
    const currentPage = Number(searchParams.get('page')) || 1;

    const [selectedIds, setSelectedIds] = useState([]);
    const isAllSelected = hatirlaticilar.results.length > 0 && 
                       hatirlaticilar.results.every(item => selectedIds.includes(item.id));
    const [statusDeleteCheck,setStatusDeleteCheck] = useState(false);
    const [deleteWarning,setDeleteWarning] = useState(false);
    const searchTimeoutRef = useRef(null);
    const [hatirlatmaTarihleriOpen,setHatirlatmaTarihleriListOpen] = useState(null)


    //console.log(selectedIds)

    const valueRange = () => {
        if (hatirlaticilar.count === 0) {
            return "Kayıt bulunmamaktadır.";
        }

        const min = (currentPage - 1) * 10 + 1;
        const max = Math.min(currentPage * 10, hatirlaticilar.count);

        // Tüm kayıtlar tek sayfada
        if (min === 1 && max === hatirlaticilar.count) {
            return `Toplam ${hatirlaticilar.count} kayıt gösteriliyor.`;
        }

        // Sayfada yalnızca 1 kayıt varsa
        if (min === max) {
            return `Toplam ${hatirlaticilar.count} kaydın ${min}. kaydı gösteriliyor.`;
        }

        return `Toplam ${hatirlaticilar.count} kaydın ${min} ila ${max} arası gösteriliyor.`;
    };

    const handlePageChange = (page) => {
        //console.log('page:',page)
        // Mevcut parametreleri bir kopyaya al
        const params = new URLSearchParams(searchParams.toString());
        //console.log('params',params)
        // Sayfayı güncelle
        params.set('page', page);
        // Yeni URL'i push et (arama parametresi korunmuş olur)
        router.push(`?${params.toString()}`);
    };

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchTerm(val); // Inputun anında yazması için state'i hemen güncelle

        // Eğer daha önce başlatılmış bir sayaç varsa, onu iptal et (kullanıcı yeni harfe bastı)
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Yeni bir sayaç başlat (örneğin 500ms)
        searchTimeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', '1'); // Aramada her zaman 1. sayfaya dön
            
            if (val) {
                params.set('arac_no', val);
            } else {
                params.delete('arac_no'); // Boşsa parametreyi sil
            }
            
            router.push(`?${params.toString()}`);
        }, 500); // 
    };

    const getPaginationGroup = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

        // 1. Tüm potansiyel sayfaları bir sete (benzersiz) ekle
        let set = new Set();
        
        // Her zaman 1. ve son sayfayı ekle
        set.add(1);
        set.add(totalPages);

        // 2. Aktif sayfanın etrafındaki "pencereyi" ekle
        // currentPage 1 veya son sayfa ise etrafını genişlet
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            set.add(i);
        }

        // 3. Listeyi diziye çevir ve sırala
        let sortedPages = Array.from(set).sort((a, b) => a - b);

        // 4. Noktaları araya "boşluk varsa" yerleştir
        let result = [];
        for (let i = 0; i < sortedPages.length; i++) {
            result.push(sortedPages[i]);
            
            // Eğer bir sonraki sayfa ile arasında boşluk varsa
            if (i < sortedPages.length - 1) {
                let next = sortedPages[i + 1];
                let current = sortedPages[i];
                
                if (next - current === 2) {
                    // Arada sadece 1 sayı varsa, o sayıyı boşluğa ekle (Örn: 1 ile 3 arasıysa 2'yi ekle)
                    result.push(current + 1);
                } else if (next - current > 2) {
                    // Arada 2'den fazla sayı varsa ... ekle
                    result.push('...');
                }
            }
        }

        return result;
    };


    const handleSelect = (id) =>{
        if (selectedIds.includes(id)){
            setSelectedIds(prev =>prev.filter(x => x !== id))
        }else{
            setSelectedIds(prev => [...prev,id])
        }
    }

    const handleAll = () => {
        const pageIds = hatirlaticilar.results.map(item => item.id);

        if (isAllSelected) {
            // Eğer hepsi seçiliyse: Mevcut listeden bu sayfadaki ID'leri filtrele
            setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
        } else {
            // Eğer hepsi seçili değilse: Set kullanarak sadece benzersiz ID'leri birleştir
            setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
        }
    };

    const deleteHandle = async () => {

        const data = await deleteHatirlaticilar(selectedIds);
        //console.log('data:',data)

        // Backend'den success: true ve remaining_count gelmesini bekliyoruz
        if (data) {
            // Backend'den gelen güncel toplam sayı ile yeni sayfa sayısını hesapla
            const newTotalPages = Math.max(
                1,
                Math.ceil((hatirlaticilar.count - selectedIds.length) / itemsPerPage)
            );
            setSelectedIds([]);
            // Eğer şu anki sayfa artık geçerli değilse (boşaldıysa), son sayfaya at
            if (currentPage > newTotalPages) {
                const params = new URLSearchParams(searchParams.toString());
                params.set('page', newTotalPages);
                router.push(`?${params.toString()}`);
            }
            
            // revalidatePath sayesinde sayfa zaten yenilenecek, 
            // arayüzde kalan araç sayısı otomatik güncellenmiş olacak.

            return data.success;
        }
    };



    return(
        <div className={styles.tableContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Araç No ile ara..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={handleSearch} 
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.ekleButton} onClick={()=>router.push('/panel/hatirlaticilar-ekle')}>
                            <Plus size={18} />
                            <span>Hatırlatıcı Ekle</span>
                        </button>
                        <button onClick={()=>selectedIds.length ? setStatusDeleteCheck(true) : setDeleteWarning(true) } className={styles.deleteButton}>
                            <Trash2 size={18} />
                            <span>Sil</span>
                        </button>
                    </div>
                </div>
                <div className={styles.titleContainer}>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isAllSelected}
                        onChange={handleAll}
                    />
                    <div className={styles.titleText}>Araç No</div>
                    <div className={styles.titleText}>Hatırlatma Türü</div>
                    <div className={styles.titleText}>Son Tarih</div>
                    <div className={styles.titleText}>Durum</div>
                    <div className={styles.titleText}></div>
                </div>
                {hatirlaticilar.results.map((item,index)=>(
                    <div key={item.id ?? index} className={styles.elemanContainer} >
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={selectedIds.includes(item.id)}
                            onChange={() => handleSelect(item.id)}
                        />
                        <div className={styles.elemanText}>{item.arac_no}</div>
                        <div className={styles.elemanText}>{item.hatirlatma_turu.charAt(0).toUpperCase() + item.hatirlatma_turu.slice(1)}</div>
                        <div className={styles.elemanText}>{new Date(item.son_tarih).toLocaleDateString('tr-TR')}</div>
                        <div className={styles.elemanText}>{item.durum ? "Aktif" : "Pasif"}</div>
                        <Link href={`/panel/hatirlaticilar/${item.id}`} className={styles.editIconContainer}>
                            Hatırlatma Tarihlerini Görüntüle
                        </Link>
                    </div>
                ))}

                <div className={styles.bottomBarContainer}>
                    <div className={styles.bottomBarText}>{valueRange()}</div>
                    <div className={styles.bottomButtonContainer}>
                        {hatirlaticilar.count > 0 && (
                        <>
                            <button 
                                disabled={!hatirlaticilar.previous} 
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`${styles.leftButton} ${!hatirlaticilar.previous ? styles.disabledButton : ''}`}
                            >
                                <ChevronLeft size={18}/>
                            </button>

                            {getPaginationGroup().map((pageNumber, index) => (
                                pageNumber === '...' ? (
                                    <span key={index} className={styles.ellipsis}>...</span>
                                ) : (
                                    <button 
                                        key={index} 
                                        className={`${styles.pageButton} ${currentPage === pageNumber ? styles.activeButton : ''}`}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            ))}

                            <button 
                                disabled={!hatirlaticilar.next} 
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`${styles.rightButton} ${!hatirlaticilar.next ? styles.disabledButton : ''}`}
                            >
                                <ChevronRight size={18}/>
                            </button>
                        </>
                        )}
                        
                    </div>
                </div>
            </div>

            {statusDeleteCheck && <DeleteCheck deleteHandle={deleteHandle} setStatusDeleteCheck={setStatusDeleteCheck} />}
            {deleteWarning && <AraclarDeleteWarning setDeleteWarning={setDeleteWarning} />}
            {hatirlatmaTarihleriOpen && <HatirlatmaTarihleriListWeb id={hatirlatmaTarihleriOpen} setHatirlatmaTarihleriListOpen={setHatirlatmaTarihleriListOpen}/>}

        </div>
    )
}