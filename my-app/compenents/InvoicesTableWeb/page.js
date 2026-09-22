'use client';
import styles from './page.module.css';
import { Download, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { invoiceDownload } from './actions';
import ErrorRes from '../ErrorRes/page';


export default function Page({ invoices }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [downloadingId, setDownloadingId] = useState(null); // İndirilen satırın ID'sini tutar
    const itemsPerPage = 10;
    const totalPages = Math.ceil(invoices.count / itemsPerPage);
    const currentPage = Number(searchParams.get('page')) || 1;
    const [error,setError] = useState(null)

    const valueRange = () => {
        if (invoices.count === 0) {
            return "Kayıt bulunmamaktadır.";
        }

        const min = (currentPage - 1) * 10 + 1;
        const max = Math.min(currentPage * 10, invoices.count);

        if (min === 1 && max === invoices.count) {
            return `Toplam ${invoices.count} kayıt gösteriliyor.`;
        }

        if (min === max) {
            return `Toplam ${invoices.count} kaydın ${min}. kaydı gösteriliyor.`;
        }

        return `Toplam ${invoices.count} kaydın ${min} ila ${max} arası gösteriliyor.`;
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page);
        router.push(`?${params.toString()}`);
    };

    const getPaginationGroup = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

        let set = new Set();
        set.add(1);
        set.add(totalPages);

        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            set.add(i);
        }

        let sortedPages = Array.from(set).sort((a, b) => a - b);
        let result = [];

        for (let i = 0; i < sortedPages.length; i++) {
            result.push(sortedPages[i]);
            
            if (i < sortedPages.length - 1) {
                let next = sortedPages[i + 1];
                let current = sortedPages[i];
                
                if (next - current === 2) {
                    result.push(current + 1);
                } else if (next - current > 2) {
                    result.push('...');
                }
            }
        }

        return result;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };


    const handleDownload = async (invoiceId,display_invoice_number) => {
        setDownloadingId(invoiceId);
        
        const response = await invoiceDownload(invoiceId);
        
        if (response.success) {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `Fatura-${display_invoice_number}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } else {
            setError(response.message);
        }
        
        setDownloadingId(null);
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.headerContainer}>
                    <p className={styles.infoText}>
                        Sadece web üzerinden gerçekleştirilen satın alma işlemlerine ait faturalar bu alanda listelenmektedir. Mobil platformlar (iOS ve Android) üzerinden yapılan işlemlerin faturalandırması ilgili uygulama mağazaları (App Store / Google Play) tarafından yapılmaktadır.
                    </p>
                </div>
                
                <div className={styles.titleContainer}>
                    <div className={styles.titleText}>Fatura No</div>
                    <div className={styles.titleText}>Paket Adı</div>
                    <div className={styles.titleText}>Tutar</div>
                    <div className={styles.titleText}>Ödeme Tarihi</div>
                    <div className={styles.titleText}>Fatura Tarihi</div>
                    <div className={styles.titleText}>Durum</div>
                    <div className={styles.titleText}>Resmi Fatura</div>
                </div>

                {invoices.results.map((item, index) => (
                    <div key={item.id ?? index} className={styles.elemanContainer}>
                        <div className={styles.elemanText}>
                            <span className={styles.invoiceNoBadge}>{item.display_invoice_number}</span>
                        </div>
                        <div className={styles.elemanText}>{item.package_title || '-'}</div>
                        <div className={styles.elemanText}>{Number(item.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</div>
                        <div className={styles.elemanText}>{formatDate(item.paid_at)}</div>
                        <div className={styles.elemanText}>{formatDate(item.invoice_date)}</div>
                        <div className={styles.elemanText}>
                            <span className={`${styles.statusBadge} ${item.status === 'success' ? styles.statusSuccess : styles.statusPending}`}>
                                {item.status === 'success' ? 'Oluşturuldu' : 'Bekliyor'}
                            </span>
                        </div>
                        <div className={styles.actionContainer}>
                            {item.status === 'success' ? (
                                <button 
                                    className={styles.downloadButton} 
                                    onClick={() => handleDownload(item.id,item.display_invoice_number)}
                                    disabled={downloadingId === item.id}
                                >
                                    {downloadingId === item.id ? (
                                        <>
                                            <span className={styles.spinner}></span>
                                            <span>İndiriliyor...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download size={16} />
                                            <span>İndir</span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button className={styles.disabledDownloadButton} disabled title="Fatura henüz oluşturulmadı">
                                    <FileText size={16} />
                                    <span>Oluşturulmadı</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <div className={styles.bottomBarContainer}>
                    <div className={styles.bottomBarText}>{valueRange()}</div>
                    <div className={styles.bottomButtonContainer}>
                        {invoices.count > 0 && (
                            <>
                                <button 
                                    disabled={!invoices.previous} 
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`${styles.leftButton} ${!invoices.previous ? styles.disabledButton : ''}`}
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
                                    disabled={!invoices.next} 
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`${styles.rightButton} ${!invoices.next ? styles.disabledButton : ''}`}
                                >
                                    <ChevronRight size={18}/>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {error && <ErrorRes errorRes={error} setErrorRes={setError} />}
        </div>
    );
}