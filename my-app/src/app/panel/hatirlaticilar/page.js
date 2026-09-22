import styles from './page.module.css';
import { Suspense } from 'react';
import Loading from '../../../../compenents/LoadingPanelCompenent/page'
import { API_ROUTES } from '../../../../utils/constant';
import { apiClient } from '../../../../lib/api-client';
import HatirlaticiTabloWeb from '../../../../compenents/HatirlaticilarTabloWeb/page'
import HatirlaticilarTabloMobil from '../../../../compenents/HatirlaticilarTabloMobil/page'
import { redirect } from 'next/navigation';

async function getHatirlaticilar(params){
    const query = new URLSearchParams(params);
    //console.log('query:',query)

      if (!query.has('page')) {
        query.append('page', '1');
      }
    
    
      const response = await apiClient(`${API_ROUTES.HATIRLATICILAR_PAGINATED}?${query.toString()}`, {
        method: 'GET'
      });


      if(response.ok){
          const data= await response.json()
          //console.log(data)
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
  
              return {status:"error", message:"Geçersiz sayfa. Görüntülemeye çalıştığınız sayfa mevcut değil. Lütfen geçerli bir sayfa numarasıyla tekrar deneyin."};
            }

            //console.log("bodysuz")

            return {status:"error", message:"Geçersiz sayfa. Görüntülemeye çalıştığınız sayfa mevcut değil. Lütfen geçerli bir sayfa numarasıyla tekrar deneyin."};

    }

}



export default async function Page ({searchParams}){

    const params = await searchParams;

    return (
    <div className={styles.pageContainer}>
      <Suspense fallback={<Loading/>}>
         <HatirlaticilarTabloWrapper params={params} />
      </Suspense>
    </div>
  );

}


async function HatirlaticilarTabloWrapper({ params }) {
  const hatirlaticilar = await getHatirlaticilar(params);
  //console.log("hatirlaticilar:",hatirlaticilar)

  if (hatirlaticilar.status==='error'){
    return(
        <div>
            <div className={styles.errorTitle}>Bir Sorunla Karşılaştık</div>
            <div className={styles.errorContext}>{hatirlaticilar.message}</div> 
        </div>
    )
  }
  
  return (
    <>
        <div className={styles.otherContainer}>
          <div className={styles.pageTitle}>Hatırlatıcılar</div>
          <HatirlaticiTabloWeb hatirlaticilar={hatirlaticilar}/>
        </div>
        <div className={styles.mobileContainer}>
            <div className={styles.pageTitle}>Hatırlatıcılar</div>
            <HatirlaticilarTabloMobil hatirlaticilar={hatirlaticilar}/>
        </div>
    </>

  )
}