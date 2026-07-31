'use server';


import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

export async function deleteHatirlaticilar(selectedId) {
    const res = await apiClient(API_ROUTES.HATIRLATICI_DELETE.replace('id',selectedId), {
        method: 'PATCH'
    });

    //console.log('resss:',res)

    //const data = await res.json();
    //console.log(data)

    if (res.ok) {
        // 'araclar' sayfasının yolunu buraya yazın (Örn: '/dashboard/araclar')
        revalidatePath('/panel/hatirlaticilar'); 
        return await res.json();
    }
    

    if (!res.ok) {
        if (res.status >= 500) {
            redirect('/internal-server-error');
        }

        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {

            //const errorData = await res.json();

            //console.log('body var:',errorData)

            return null;
        }
        
        //console.log('body yok')

        return null;

    }

}