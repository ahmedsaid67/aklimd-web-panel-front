'use client';
import styles from './page.module.css';
import { Download, ChevronLeft, ChevronRight, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import InvoiceOptions from '../InvoiceOptions/page';
import { invoiceDownload } from './actions';
import ErrorRes from '../ErrorRes/page';

export default function InvoicesTableMobile({ invoices }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedInvoiceItem, setSelectedInvoiceItem] = useState(null);
    
    const itemsPerPage = 10;
    const totalPages = Math.ceil(invoices.count / itemsPerPage);
    const currentPage = Number(searchParams.get('page')) || 1;
    const [isInfoOpen, setIsInfoOpen] = useState(false);
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



    const openOptions = (item) => {
        setSelectedInvoiceItem(item);
    };


    const handleDownload = async (invoiceId,display_invoice_number) => {
        
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

    };





    return (
        <div className={styles.tableContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.headerContainer} onClick={() => setIsInfoOpen(!isInfoOpen)}>
                    <div className={styles.infoContentWrapper}>
                        <p className={`${styles.infoText} ${!isInfoOpen ? styles.infoTextTruncated : ''}`}>
                            Sadece web üzerinden gerçekleştirilen satın alma işlemlerine ait faturalar bu alanda listelenmektedir. 
                            Mobil platformlar (iOS ve Android) üzerinden yapılan işlemlerin faturalandırması ilgili uygulama mağazaları 
                            (App Store / Google Play) tarafından yapılmaktadır.
                        </p>
                        <button className={styles.toggleButton} type="button">
                            {isInfoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>
                </div>
                
                {invoices.results.map((item, index) => (
                    <div 
                        key={item.id ?? index} 
                        className={styles.elemanContainer} 
                        onClick={() => openOptions(item)}
                    >
                        <div className={styles.elemanLeft}>
                            <div className={styles.elemanTextPrimary}>{item.package_title || '-'}</div>
                            <div className={styles.elemanTextSecondary}>
                                <span>{item.display_invoice_number}</span>
                                <span className={styles.statusSeparator}>-</span>
                                <span className={`${styles.statusBadge} ${styles[item.status]}`}>
                                    {item.status === 'success' ? 'Oluşturuldu' : 'Bekliyor'}
                                </span>
                            </div>
                        </div>
                        <button className={styles.elemanRight}>
                            <ChevronRight size={18} />
                        </button>
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

            {selectedInvoiceItem && (
                <InvoiceOptions item={selectedInvoiceItem} setOptions={setSelectedInvoiceItem} handleDownload={handleDownload}/>
            )}

            {error && <ErrorRes errorRes={error} setErrorRes={setError} />}
        </div>
    );
}