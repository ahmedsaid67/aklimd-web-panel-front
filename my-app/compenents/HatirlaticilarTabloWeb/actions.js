'use server';

import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

export async function deleteHatirlaticilar(selectedIds) {

    const res = await apiClient(API_ROUTES.HATIRLATICILAR_FULL_DELETE, {
        method: 'PATCH',
        body: JSON.stringify({
            hatirlaticilar_list_id: selectedIds
        })
    });

    //console.log('resss:',res)

    if (res.ok) {
        revalidatePath('/panel/hatirlaticilar'); 
        const data =await res.json();
        //console.log(data)
        return data
    }

    if (!res.ok) {
            if (res.status >= 500) {
                redirect('/internal-server-error');
            }

            const contentType = res.headers.get("content-type");

            // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.

            if (contentType && contentType.includes("application/json")) {

                const errorData = await res.json();
                //console.log('body var:',errorData)

                null;
            }

            //console.log('body yok:.')

            return null
    }
}