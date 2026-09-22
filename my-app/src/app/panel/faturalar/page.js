import styles from './page.module.css';
import InvoicesTableWeb from '../../../../compenents/InvoicesTableWeb/page'
import { Suspense } from 'react';
import Loading from '../../../../compenents/LoadingPanelCompenent/page'
import { API_ROUTES } from '../../../../utils/constant';
import { apiClient } from '../../../../lib/api-client';
import { redirect } from 'next/navigation';
import InvoicesTableMobile from '../../../../compenents/InvoicesTableMobile/page'

async function getInvoices (params) {

    const query = new URLSearchParams(params);
    //console.log('query:',query)
    
    if (!query.has('page')) {
      query.append('page', '1');
    }


    const response = await apiClient(`${API_ROUTES.INVOICES}?${query.toString()}`, {
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
         <InvoicesTableWrapper params={params} />
      </Suspense>
    </div>
  );

}


async function InvoicesTableWrapper({ params }) {
  const invoices = await getInvoices(params);
  //console.log("invoices:",invoices)

  if (invoices.status==='error'){
    return(
        <div>
            <div className={styles.errorTitle}>Bir Sorunla Karşılaştık</div>
            <div className={styles.errorContext}>{invoices.message}</div> 
        </div>
    )
  }
  
  return (
    <>
        <div className={styles.otherContainer}>
          <div className={styles.pageTitle}>Faturalar</div>
          <InvoicesTableWeb invoices={invoices} /> 
        </div>
        <div className={styles.mobileContainer}>
            <div className={styles.pageTitle}>Faturalar</div>
            <InvoicesTableMobile invoices={invoices} /> 
        </div>
    </>

  )
}