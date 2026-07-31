import { apiClient } from "../../../../../lib/api-client";
import { API_ROUTES } from "../../../../../utils/constant";
import { Suspense } from 'react';
import Loading from '../../../../../compenents/LoadingPanelCompenent/page'
import styles from './page.module.css';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; 
import AracDetayWeb from '../../../../../compenents/AracDetayWeb/page'
import AracDetayMobil from '../../../../../compenents/AracDetayMobil/page'

async function getArac(id) {

    const response = await apiClient(`${API_ROUTES.ARACLAR}${id}/`)
    //const data = await response.json(); 
    //console.log(response);


    if(response.ok){
        const data = await response.json(); 
        //console.log(data);
        return data;
    }

    if (!response.ok) {
            if (response.status >= 500) {
                // Eğer backend HTML veya başka bir şey döndüyse (500 hata sayfaları gibi)
                // res.json() çağırmıyoruz, direkt durumu dönüyoruz. 'Internal Server Error' ise tanımlanmamıs bır hata.
                redirect('/internal-server-error');
            }

            const contentType = response.headers.get("content-type");

            // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.

            if (contentType && contentType.includes("application/json")) {

                // front tarafında olası hataları engelleyecek sekılde kodladıgımızdan zaten buraya dusmeyecek

                //const errorData = await response.json();

                //console.log('body var:',errorData)

                // spesııfk olarak kendısıne aıt olmayan bır arac lıstelemeye calısabılır boyle bır arac yok dıyecegız
                // onun dısında body sı olsa dahı bır 500den kucuk hatalar yıne arac yok haatsıdır . 
              

                return {status:'error',message:'Talep edilen araç kaydı mevcut değildir.'};
            }

            // birde 500den kucuk olup ama body sı olmayan hatalar olabılıyor, bız front tarafındna her türlü hatanın onu kestıgımızden null dıyıp gecıyoruz
            // ama spesfık bunada bakılmalılır ---- burada null deyıp gecemeyebılırız
            // uygun olmayan bir id gonderılıyor buna dair de arac yok. boyle bır arac yok yanıtı basacagız.
            //console.log('body yok: Böyle bir araç bulunmamaktadır.')


            return {status:'error',message:'Talep edilen araç kaydı mevcut değildir.'};;

    }

}

export default async function Page ({ params }) {
    const { id } = await params;
    console.log('id:',id)
    


    return (
        <div className={styles.pageContainer}>
            {/* 2. Suspense: İçerideki component "await" edene kadar fallback'i gösterir */}
            <Suspense fallback={<Loading/>}>
                <AraclarTabloWrapper id={id} />
            </Suspense>
        </div>
    );

}


async function AraclarTabloWrapper({ id }) {
  const arac = await getArac(id)
  console.log('arac:',arac)

  if (arac.status==='error'){
        return(
            <div>
                <div className={styles.headerContainer}>
                    <div className={styles.errorTitle}>Bir Sorunla Karşılaştık</div>
                    <Link href="/panel/araclar" className={styles.backButton}>
                        <ArrowLeft size={18} />
                        <div>Araçlara Dön</div>
                    </Link>
                </div>
                <div className={styles.errorContext}>{arac.message}</div> 
            </div>
        )
  }
  
  return (
    <>
        <div className={styles.otherContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.pageTitle}>Araç Detayları</div>
                    <Link href="/panel/araclar" className={styles.backButton}>
                        <ArrowLeft size={18} />
                        <div>Araçlara Dön</div>
                    </Link>
                </div>
                <AracDetayWeb arac={arac} />
        </div>
        <div className={styles.mobileContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.pageTitle}>Araç Detayları</div>
                <Link href="/panel/araclar" className={styles.backButton}>
                    <ArrowLeft size={18} />
                    <div>Araçlara Dön</div>
                </Link>
            </div>
            <AracDetayMobil arac={arac} />
        </div>
    </>
  )
}




