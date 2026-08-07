'use server';

import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';


export const mesajGonder = async (payload) => {

    const res = await apiClient(API_ROUTES.ILETISIM, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const data =await res.json();
        console.log(data)
        return { success: true, message: "Mesajınız başarıyla iletildi." };
    }

    if (!res.ok) {
            if (res.status >= 500) {
                redirect('/internal-server-error');
            }
            // normal şartlarda buraya düşmemesi lazım front tarafında engeller yapılmış olması gerekiyor ki yaptıkta ama sağlama aldık.

            const contentType = res.headers.get("content-type");

            // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.

            if (contentType && contentType.includes("application/json")) {

                const errorData = await res.json();
                console.log('body var:', errorData)

                
                return { success: false, message: "Mesajınız iletilmedi, daha sonra tekrar deneyiniz." };
            }

            console.log('body yok: Böyle bir araç bulunmamaktadır.')

            return { success: false, message: "Mesajınız iletilmedi, daha sonra tekrar deneyiniz." };
    }

}
