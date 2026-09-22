import styles from './page.module.css'
import { Suspense } from 'react';
import Loading from '../../../compenents/LoadingPanelCompenent/page'
import { API_ROUTES } from '../../../utils/constant';
import { apiClient } from '../../../lib/api-client';
import HomePageContainer from '../../../compenents/HomePageContainer/page';

async function getUsageSummary() {

    const response = await apiClient(API_ROUTES.GET_KULLANIM_OZETI, {
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
            const errorData = await response.json();
            //console.log('body var:', errorData);
            return {status: "error", message: "Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz."};
        }

        //console.log("bodysuz");
        return {status: "error", message: "Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz."};
    }

}


export default async function Page (){


    return (
    <div className={styles.pageContainer}>
      <Suspense fallback={<Loading/>}>
         <HomePageWrapper/>
      </Suspense>
    </div>
  );

}


async function HomePageWrapper({ params }) {
  const usageSummary = await getUsageSummary(params);
  //console.log("usageSummary:",usageSummary)

  if (usageSummary.status==='error'){
    return(
        <div>
            <div className={styles.errorTitle}>Bir Sorunla Karşılaştık</div>
            <div className={styles.errorContext}>{usageSummary.message}</div> 
        </div>
    )
  }
  
  return (

      <div>
        <div className={styles.pageTitle}>Ana Sayfa</div>
        <HomePageContainer usageSummary={usageSummary}/>
      </div>

  )
}