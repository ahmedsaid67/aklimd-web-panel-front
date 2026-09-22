import { apiClient } from "../../../../../lib/api-client";
import { API_ROUTES } from "../../../../../utils/constant";
import { Suspense } from 'react';
import Loading from '../../../../../compenents/LoadingPanelCompenent/page'
import styles from './page.module.css';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; 
import PaketWeb from '../../../../../compenents/PaketWeb/page'


async function getPaket(id) {

    const response = await apiClient(API_ROUTES.PAYMENT_PAGE_VIEW.replace("id",id), {
        method: 'GET'
      })


    if(response.ok){
        const data = await response.json(); 
        //console.log(data);
        return data;
    }

    if (!response.ok) {
            if (response.status >= 500) {
                redirect('/internal-server-error');
            }

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {

                const errorData = await response.json();
                //console.log('body var:',errorData)
              

                return {status:'error', message:'Talep ettiğiniz paket bulunamadı.'};
            }
            //console.log("bodysuz",)

            return {status:'error',message:'Talep ettiğiniz paket bulunamadı.'};;

    }

}

export default async function Page ({ params }) {
    const { id } = await params;
    //console.log('id:',id)
    
    return (
        <div className={styles.pageContainer}>
            {/* 2. Suspense: İçerideki component "await" edene kadar fallback'i gösterir */}
            <Suspense fallback={<Loading/>}>
                <PaketWrapper id={id} />
            </Suspense>
        </div>
    );

}


async function PaketWrapper({ id }) {
  const paket = await getPaket(id)
  console.log('paket:',paket)

  if (paket.status==='error'){
        return(
            <div>
                <div className={styles.headerContainer}>
                    <div className={styles.errorTitle}>Bir Sorunla Karşılaştık</div>
                    <Link href="/panel/paketler" className={styles.backButton}>
                        <ArrowLeft size={18} />
                        <div>Paketlere Dön</div>
                    </Link>
                </div>
                <div className={styles.errorContext}>{paket.message}</div> 
            </div>
        )
  }
  
  return (
        <div>
            <div className={styles.headerContainer}>
                <div className={styles.pageTitle}>Ödeme Ekranı</div>
                <Link href="/panel/paketler" className={styles.backButton}>
                    <ArrowLeft size={18} />
                    <div>Paketlere Dön</div>
                </Link>
            </div>
            <PaketWeb paket={paket} />
        </div>
  )
}


