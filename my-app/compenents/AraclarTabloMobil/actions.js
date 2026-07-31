'use server';


import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

export async function deleteAraclar(selectedId) {
    const res = await apiClient(API_ROUTES.ARAC_DELETE.replace('id',selectedId), {
        method: 'PUT'
    });

    //console.log('resss:',res)

    //const data = await res.json();
    //console.log(data)

    if (res.ok) {
        // 'araclar' sayfasının yolunu buraya yazın (Örn: '/dashboard/araclar')
        revalidatePath('/panel/araclar'); 
        return await res.json();
    }
    
    // fecth baglantı kuramayınca dıkret fetch satırı hata oluyor, burada yakalayamayız, bağlantı hatasıdır,
    //  ama onun dısında endpıntten hata yanıtı dondu ıse 400-500 fark yok asagıda yakalıyorsun.

    if (!res.ok) {
        if (res.status >= 500) {
            // Eğer backend HTML veya başka bir şey döndüyse (500 hata sayfaları gibi)
            // res.json() çağırmıyoruz, direkt durumu dönüyoruz. 'Internal Server Error' ise tanımlanmamıs bır hata.
            redirect('/internal-server-error');
        }

        const contentType = res.headers.get("content-type");

        // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.

        if (contentType && contentType.includes("application/json")) {

            // front tarafında olası hataları engelleyecek sekılde kodladıgımızdan zaten buraya dusmeyecek

            //const errorData = await res.json();
            //return { error: errorData.error || "Bir hata oluştu" }; --- backneddın yanuıtıda gore tabıkı errorDate ıcerıgıne bakılması lazım.
            // normal şartlarda yukarıdaki yanıtı dönmek lazım ama front tarafındaki genel yapı bu endpintten belirlenmiş hata çıktısı almadan
            // engelleyıcı bıcıdme tasarlandıgında hata riski yoktur buyuzden direkt null diyorum tetikleyici funtionda null değil ise hata yoktur deyip
            // hatasız seneryoyu kodlayacak sadece -- 401 ve baglantı hatası zaten api-clietde , belirsiz hatada asagıda yakalanıyor zaten

            //console.log('body var:',errorData)

            return null;
        }

        // birde 500den kucuk olup ama body sı olmayan hatalar olabılıyor, bız front tarafındna hertulru hatanın onu kestıgımızden null dıyıp gecıyoruz
        // ama spesfık bunada bakılmalılır
        //console.log('body yok')


        return null;

    }

}