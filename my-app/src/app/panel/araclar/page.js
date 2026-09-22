import styles from './page.module.css';
import AraclarTablo from '../../../../compenents/AraclarTablo/page'
import { Suspense } from 'react';
import Loading from '../../../../compenents/LoadingPanelCompenent/page'
import AraclarTabloMobil from '../../../../compenents/AraclarTabloMobil/page'
import { API_ROUTES } from '../../../../utils/constant';
import { apiClient } from '../../../../lib/api-client';
import { redirect } from 'next/navigation';

async function getAraclar(params) {


    const query = new URLSearchParams(params);
    //console.log('query:',query)
    
    if (!query.has('page')) {
      query.append('page', '1');
    }

    const response = await apiClient(`${API_ROUTES.ARACLAR_PAGINATED}?${query.toString()}`, {
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
         <AraclarTabloWrapper params={params} />
      </Suspense>
    </div>
  );

}


async function AraclarTabloWrapper({ params }) {
  const araclar = await getAraclar(params);
  //console.log("araclar:",araclar)

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
        <div className={styles.otherContainer}>
          <div className={styles.pageTitle}>Araçlar</div>
          <AraclarTablo araclar={araclar} /> 
        </div>
        <div className={styles.mobileContainer}>
            <div className={styles.pageTitle}>Araçlar</div>
            <AraclarTabloMobil araclar={araclar} /> 
        </div>
    </>

  )
}




// ssrde veriyi çekerken, await kullanmadığında veri çekilene kadar beklemiyor, bir önceki sayfa donuk kalıyor, veri çekildiğinde yeni sayfa yükleniyor.
// awit olmaz ise veriyi çekmeden sayfayı yüklüyor bu seferde veriyi bağlı arayüz ya patlıyor patlamasın diye kontroller yapsan dahi ssr de use client gibi
// state ler uzerınden tekrar verı geldı anlık render olmadıgından verı geldıkten sonra verı ıle arayuz tazelenmıyor.
// veri gelene kadar bi önceki sayfa donuk kalmasın istiyorsan, yukarıdakş gibi suspanse kullanıyorsun. sayfa il açıldığında once fallback dekı sayfa veri yuklenınce
// asıl sayfan veya ıste compnenetın ortaya cıkıyor.
// suspende compnent hazır olana kadar fallbacktekı sayfayı gosterır.

// AraclarTabloda router bulumakta bunun varsayılan davranışı,
// router.push kullanıldığında, Next.js "yeni sayfa hazır olana kadar eskisiyle devam et" politikasını izler.
// Eski sayfa halihazırda "yüklenmiş ve hazır" olduğu için Suspense tetiklenmez; 
// çünkü React, zaten görünürde olan bir içeriğin Suspense'e düşmesini gerektirecek bir "boşluk" (placeholder) görmez.

// Aynı route içinde (?page=1 → ?page=2) çoğunlukla eski UI korunur, Suspense görünmeyebilir.
// Farklı route'a geçerken (/araclar → /hatirlaticilar) yeni route'un içinde bir Suspense varsa, veri beklenirken onun fallback'i gösterilebilir.

// routerın bu aynı route içinde sayfa değişiminde oncekı sayfayı dondurup yenısı gelince değiştime davranışı, istenirse değiştiriliyor,
// o arada loaındg yada butonları dısabled et falan gıbı seyler yapılıyor, istenirse yapılır, ben suan dokunmuyorum.