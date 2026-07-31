import styles from './page.module.css';
import AraclarTablo from '../../../../compenents/AraclarTablo/page'
import { Suspense } from 'react';
import Loading from '../../../../compenents/LoadingPanelCompenent/page'
import AraclarTabloMobil from '../../../../compenents/AraclarTabloMobil/page'
import { API_ROUTES } from '../../../../utils/constant';
import { apiClient } from '../../../../lib/api-client';

// Veriyi SSR sırasında çekmek için asenkron fonksiyonu çağırıyoruz
async function getAraclar(params) {

  //await new Promise(resolve => setTimeout(resolve, 3000));
  // URL'deki tüm parametreleri (page, arac_no, vb.) otomatik olarak al
  const query = new URLSearchParams(params);
  console.log('query:',query)
  
  // Eğer 'page' yoksa varsayılan olarak 1 ekle
  if (!query.has('page')) {
    query.append('page', '1');
  }

   console.log(`${API_ROUTES.ARACLAR_PAGINATED}?${query.toString()}`)

  const res = await apiClient(`${API_ROUTES.ARACLAR_PAGINATED}?${query.toString()}`, {
    method: 'GET'
  });

  const data = await res.json();

  if(!res.ok){
    if(data.detail==='Geçersiz sayfa.'){
      throw new Error('Geçersiz sayfa. Görüntülemeye çalıştığınız sayfa mevcut değil. Lütfen geçerli bir sayfa numarasıyla tekrar deneyin')
    }
  }

  return data


}


// sunucu hata yonetımıne daha sonra bakacagım. hem auth hatası olabılır hemde server çökme-ınternet hatası gıbı seyler.

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle}>Araçlar</div>
      
      {/* 2. Suspense: İçerideki component "await" edene kadar fallback'i gösterir */}
      <Suspense fallback={<Loading/>}>
         <AraclarTabloWrapper params={params} />
      </Suspense>
    </div>
  );
}

// 3. Wrapper: Veriyi burada "await" ediyoruz. 
// "await" buraya geldiği için artık "AraclarTablo"ya sadece temiz veri gidecek.
async function AraclarTabloWrapper({ params }) {
  const araclar = await getAraclar(params);
  
  return (
    <>
        <div className={styles.otherContainer}>
          <AraclarTablo araclar={araclar} />   
        </div>
        <div className={styles.mobileContainer}>
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