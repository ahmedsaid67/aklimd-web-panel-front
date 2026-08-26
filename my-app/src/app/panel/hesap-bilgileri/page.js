import styles from './page.module.css';
import { Suspense } from 'react';
import Loading from '../../../../compenents/LoadingPanelCompenent/page'
import { API_ROUTES } from '../../../../utils/constant';
import { apiClient } from '../../../../lib/api-client';
import { redirect, notFound } from 'next/navigation'; // notFound eklendi
import HesapBilgileriMain from '../../../../compenents/HesapBilgileriMain/page'

async function getProfil(tabUrl){
    // 1. İzin verilen geçerli tab listesi
    const VALID_TABS = ["kullanici-bilgileri", "fatura-bilgileri", "kullanim-ozeti"];

    // 2. Eğer listede yoksa doğrudan Next.js 404 (Not Found) sayfasına fırlat
    if (!VALID_TABS.includes(tabUrl)) {
        notFound();
    }

    let response;

    if (tabUrl === "kullanici-bilgileri"){
        response = await apiClient(API_ROUTES.GET_USER, {
          method: 'GET'
        });
    }

    if (tabUrl === "fatura-bilgileri"){
        response = await apiClient(API_ROUTES.BILLING_PROFILE_ME, {
          method: 'GET'
        });
    }

    if (tabUrl === "kullanim-ozeti"){
        response = await apiClient(API_ROUTES.GET_KULLANIM_OZETI, {
          method: 'GET'
        });
    }

    if(response.ok){
        const data = await response.json();
        console.log(data);
        return data;
    }

    if (!response.ok) {
        if (response.status >= 500) {
            redirect('/internal-server-error');
        }

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            //console.log('body var:', errorData);
            return {status: "error", message: "Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz."};
        }

        //console.log("bodysuz");
        return {status: "error", message: "Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz."};
    }
}

export default async function Page ({ searchParams }){
    const resolvedSearchParams = await searchParams;
    const tabUrl = resolvedSearchParams?.tab || "kullanici-bilgileri";

    return (
    <div className={styles.pageContainer}>
      <Suspense fallback={<Loading/>}>
         <ProfilWrapper tabUrl={tabUrl}/>
      </Suspense>
    </div>
  );
}

async function ProfilWrapper({ tabUrl }) {
  const info = await getProfil(tabUrl);
  console.log("info:", info);

  if (info.status === 'error'){
    return(
        <div>
            <div className={styles.errorTitle}>Bir Sorunla Karşılaştık</div>
            <div className={styles.errorContext}>{info.message}</div> 
        </div>
    )
  }
  
  return (
    <>
        <div className={styles.otherContainer}>
          <div className={styles.pageTitle}>Hesap Bilgileri</div>
          <HesapBilgileriMain info={info} tabUrl={tabUrl}/>
        </div>

    </>
  )
}