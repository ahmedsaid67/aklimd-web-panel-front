'use server';

import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';


export async function invoiceDownload(id) {
    
    const res = await apiClient(API_ROUTES.INVOICE_DOWNLOAD.replace("id",id), {
        method: 'GET',
    });


    if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        return { success: true, data: arrayBuffer };
    }

    if (!res.ok) {
            if (res.status >= 500) {
                redirect('/internal-server-error');
            }

            const contentType = res.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {

                const errorData = await res.json();
                //console.log('body var:',errorData)

                return { success: false, message: "Bir şeyler ters gitti daha sonra tekrar deneyiniz" };
            }

            //console.log('body yok: Böyle bir araç bulunmamaktadır.')

            return { success: false, message: "Bir şeyler ters gitti daha sonra tekrar deneyiniz" };
    }
}