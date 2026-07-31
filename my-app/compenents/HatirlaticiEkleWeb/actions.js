'use server';

import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';


export async function hatirlaticiKaydet(formData) {
    
    const res = await apiClient(API_ROUTES.HATIRLATICILAR, {
        method: 'POST',
        body: JSON.stringify(formData)
    });

    //console.log('resss:',res)

    if (res.ok) {
        const data =await res.json();
        console.log(data)
        return { success: true, message: "Hatırlatıcı oluşturma işlemi başarıyla gerçekleştirildi." };
    }

    if (!res.ok) {
            if (res.status >= 500) {
                redirect('/internal-server-error');
            }
            // normal şartlarda buraya düşmemesi lazım front tarafında engeller yapılmış olması gerekiyor ki yaptıkta ama sağlama aldık.

            const contentType = res.headers.get("content-type");

            // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.

            if (contentType && contentType.includes("application/json")) {

                //const errorData = await res.json();
                //console.log('body var:',errorData.hatirlatma_tarihleri)

                return { success: false, message: "Hatırlatıcı oluşturulamadı." };
            }

            //console.log('body yok: Böyle bir araç bulunmamaktadır.')

            return { success: false, message: "Hatırlatıcı oluşturulamadı." };
    }
}