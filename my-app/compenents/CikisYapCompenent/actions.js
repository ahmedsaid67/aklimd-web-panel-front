'use server';

import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function cikisYap() {

    const res = await apiClient(API_ROUTES.LOGOUT, {
        method: 'POST',
    });

    //console.log('resss:',res)

    if (res.ok) {
        const cookieStore = await cookies();
        cookieStore.delete('accessToken');

        const data =await res.json();
        //console.log(data)
        return { success: true, message: "Hatırlatıcı oluşturma işlemi başarıyla gerçekleştirildi." };
    }


    if (!res.ok) {
        if (res.status >= 500) {
            redirect('/internal-server-error');
        }

        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();

            return { success: false, message: "Bir şeyler ters gitti daha sonra tekrar deneyiniz." };
        }

        //console.log('body yok')

        return { success: false, message: "Bir şeyler ters gitti daha sonra tekrar deneyiniz." };
    }
    
}