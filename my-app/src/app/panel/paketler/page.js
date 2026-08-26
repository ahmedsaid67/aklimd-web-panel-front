import styles from './page.module.css';
import { Suspense } from 'react';
import Loading from '../../../../compenents/LoadingPanelCompenent/page'
import { API_ROUTES } from '../../../../utils/constant';
import { apiClient } from '../../../../lib/api-client';
import Paketler from '../../../../compenents/Paketler/page'
import { redirect } from 'next/navigation';

async function getPaketler(){

      const response = await apiClient(API_ROUTES.PACKAGES, {
        method: 'GET'
      });


      if(response.ok){
          const data= await response.json()
          console.log(data)

          return data;
      }


      if (!response.ok) {
            if (response.status >= 500) {
                redirect('/internal-server-error');
            }

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
              //const errorData = await response.json();
              //console.log('body var:',errorData)
  
              return {status:"error", message:"Geçersiz sayfa. Görüntülemeye çalıştığınız sayfa mevcut değil. Lütfen geçerli bir sayfa numarasıyla tekrar deneyin"};
            }

            //console.log("bodysuz")

            return {status:"error", message:"Geçersiz sayfa. Görüntülemeye çalıştığınız sayfa mevcut değil. Lütfen geçerli bir sayfa numarasıyla tekrar deneyin"};

    }

}



export default async function Page (){


    return (
    <div className={styles.pageContainer}>
      <Suspense fallback={<Loading/>}>
         <PaketlerWrapper />
      </Suspense>
    </div>
  );

}


async function PaketlerWrapper() {
  const paketler = await getPaketler();
  console.log("paketler:",paketler)

  if (paketler.status==='error'){
    return(
        <div>
            <div className={styles.errorTitle}>Bir Sorunla Karşılaştık</div>
            <div className={styles.errorContext}>{paketler.message}</div> 
        </div>
    )
  }
  
  return (
    <>
        <div className={styles.otherContainer}>
          <div className={styles.pageTitle}>Paketler</div>
          <Paketler paketler={paketler}/>
        </div>
    </>

  )
}