import { API_ROUTES } from '../../../../../../utils/constant';
import { apiClient } from '../../../../../../lib/api-client';
import { redirect } from 'next/navigation';
import HatirlatmaTarihleriListWeb from '../../../../../../compenents/HatirlatmaTarihleriListWeb/page';
import HatirlatmaTarihleriListMobile from '../../../../../../compenents/HatirlatmaTarihleriListMobile/page';
import styles from "./page.module.css"


const getHatirlatmaTarihleri = async(id) => {

    const res = await apiClient(API_ROUTES.HATIRLATMA_TARIHI_lIST.replace("id", id), {
        method: 'GET'
    });
    if (res.ok) {
        const data= await res.json()
        //console.log("res:",data)

        return {status:"succes",data};
    }
    if (!res.ok) {
        if (res.status >= 500) {
            redirect('/internal-server-error');
        }

        const contentType = res.headers.get("content-type");

        // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.
        // ön yüzde buradaki hataları engelledik, buraya kullanıcı düşmeyecek ama biz yinede sağlama alıyoruz.

        if (contentType && contentType.includes("application/json")) {

            //const errorData = await res.json();
            //console.log('body var:',errorData)

            return {status:"error",message:"Bir hata oluştu daha sonra tekrar deneyiniz"};;
        }

        //console.log('body yok:.')

        return {status:"error",message:"Bir hata oluştu daha sonra tekrar deneyiniz"};;
    }
}



export default async function Page ({params}) {

    const { id } = await params;

    const hatirlatmaTarihleri = await getHatirlatmaTarihleri(id)
    console.log("hatirlatma tarihleri:",hatirlatmaTarihleri)

    return (
        <>
            <div className={styles.webContainer}>
                <HatirlatmaTarihleriListWeb hatirlatmaTarihleri={hatirlatmaTarihleri} />
            </div>
            <div className={styles.mobileContainer}>
                <HatirlatmaTarihleriListMobile hatirlatmaTarihleri={hatirlatmaTarihleri} />
            </div>
        </>
        
    )

}