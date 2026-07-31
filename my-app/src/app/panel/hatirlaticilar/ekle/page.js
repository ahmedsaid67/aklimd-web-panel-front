import styles from './page.module.css';
import HatirlaticiEkleWeb from '../../../../../compenents/HatirlaticiEkleWeb/page';
import HatirlaticiEkleMobil from '../../../../../compenents/HatirlaticiEkleMobil/page'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // İkonu import et
import { API_ROUTES } from '../../../../../utils/constant';
import { apiClient } from '../../../../../lib/api-client';
import { redirect } from 'next/navigation';
import Loading from '../../../../../compenents/LoadingPanelCompenent/page';
import { Suspense } from 'react';

async function getAraclar(){

    const response = await apiClient(API_ROUTES.ARACLAR_SEARCH_FOR_CARS,{method: 'GET'})

    if (response.ok) {
        const data = await response.json()
        console.log("data:",data)
        return data;
    }

    if (!response.ok) {
        if (response.status >= 500) {
            redirect('/internal-server-error');
        }

        // buraya bir hata düşmesini beklemiyoruz ama yiede boş alan bırakmayalom dedik.

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            //const errorData = await response.json();
            //console.log('body var:',errorData)

            return {status:"error", message:"Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin"};
        }

        //console.log("bodysuz")

        return {status:"error", message:"Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin"};

    }

} 


export default async function Page (){


    return (
    <div className={styles.pageContainer}>
      <Suspense fallback={<Loading/>}>
         <HatirlaticilarEkleWrapper/>
      </Suspense>
    </div>
  );

}

async function HatirlaticilarEkleWrapper() {

    const araclar = await getAraclar();

    if (araclar.status==='error'){
        return(
            <div>
                <div className={styles.errorTitle}>Bir Sorunla Karşılaştık</div>
                <div className={styles.errorContext}>{araclar.message}</div> 
            </div>
        )
    }


    return (
        <>
            <div className={styles.headerWrapper}>
                <div className={styles.pageTitle}>Hatırlatıcı Ekle</div>
                <Link href="/panel/hatirlaticilar" className={styles.backButton}>
                    <ArrowLeft size={18} />
                    <div>Hatılatıcılara Dön</div>
                </Link>
            </div>
            <div className={styles.webCompenet}>
                <HatirlaticiEkleWeb araclar={araclar}/>
            </div>
            <div className={styles.mobilCompenet}>
                <HatirlaticiEkleMobil araclar={araclar}/>
            </div>
        </>
    )
}