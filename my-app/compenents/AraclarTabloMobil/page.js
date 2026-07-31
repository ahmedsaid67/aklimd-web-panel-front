'use client';
import styles from './page.module.css';
import { Plus,ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AraclarOptions from '../AraclarOptions/page'
import { deleteAraclar } from './actions';


export default function Page ({araclar}){


    const router = useRouter();
    // useState'i şöyle başlat
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('arac_no') || '');
    const itemsPerPage = 10;
    const totalPages = Math.ceil(araclar.count / itemsPerPage);
    const currentPage = Number(searchParams.get('page')) || 1;
    const [selectedAracId,setSelectedAracId] = useState(null)
    const searchTimeoutRef = useRef(null);

    const valueRange = () => {
        if (araclar.count === 0) {
            return "Kayıt bulunmamaktadır.";
        }

        const min = (currentPage - 1) * 10 + 1;
        const max = Math.min(currentPage * 10, araclar.count);

        // Tüm kayıtlar tek sayfada
        if (min === 1 && max === araclar.count) {
            return `Toplam ${araclar.count} kayıt gösteriliyor.`;
        }

        // Sayfada yalnızca 1 kayıt varsa
        if (min === max) {
            return `Toplam ${araclar.count} kaydın ${min}. kaydı gösteriliyor.`;
        }

        return `Toplam ${araclar.count} kaydın ${min} ila ${max} arası gösteriliyor.`;
    };

    const handlePageChange = (page) => {
        console.log('page:',page)
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


    const deleteHandle = async (id) => {
        //console.log(id)

        const data = await deleteAraclar(id);
        //console.log('data:',data)

        if (data) {
            // Backend'den gelen güncel toplam sayı ile yeni sayfa sayısını hesapla
            const newTotalPages = Math.max(
                1,
                Math.ceil((araclar.count - 1) / itemsPerPage)
            );
            //console.log("newTotalPages:",newTotalPages)

            // Eğer şu anki sayfa artık geçerli değilse (boşaldıysa), son sayfaya at
            if (currentPage > newTotalPages) {
                const params = new URLSearchParams(searchParams.toString());
                params.set('page', newTotalPages);
                router.push(`?${params.toString()}`);
            }

            setSelectedAracId(null)
            
            // revalidatePath sayesinde sayfa zaten yenilenecek, 
            // arayüzde kalan araç sayısı otomatik güncellenmiş olacak.

        }
    }

    const openOptions = (id) => {
        setSelectedAracId(id);
    };


    return(
        <div className={styles.tableContainer}>
            <div className={styles.mainContainer}>

                    <div className={styles.headerContainer}>
                        <div className={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Araç ara..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={handleSearch} 
                            />
                        </div>
                    </div>
                    {araclar.results.map((item,index)=>(
                    <div key={item.id ?? index} className={styles.elemanContainer} onClick={()=>openOptions(item.id)}>
                        <div className={styles.elemanLeft}>
                            <div className={styles.elemanText}>{item.arac_no}</div>
                            <div className={styles.elemanText}>{item.arac_plakasi}</div>
                        </div>
                        <button className={styles.elemanRight}>
                            <ChevronRight size={18}/>
                        </button>
                    </div>
                    ))}


                <div className={styles.bottomBarContainer}>
                    <div className={styles.bottomBarText}>{valueRange()}</div>
                    <div className={styles.bottomButtonContainer}>
                        {araclar.count > 0 && (
                        <>
                            <button 
                                disabled={!araclar.previous} 
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`${styles.leftButton} ${!araclar.previous ? styles.disabledButton : ''}`}
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
                                disabled={!araclar.next} 
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`${styles.rightButton} ${!araclar.next ? styles.disabledButton : ''}`}
                            >
                                <ChevronRight size={18}/>
                            </button>
                        </>
                        )}
                        
                    </div>
                </div>

                <button onClick={()=>router.push('/panel/araclar/ekle')} className={styles.ekleButton}>
                    <Plus size={18} />
                    <span>Araç Ekle</span>
                </button>
            </div>
            {selectedAracId && <AraclarOptions id={selectedAracId} setOptions={setSelectedAracId} deleteHandle={deleteHandle}/>}
        </div>
    )
}