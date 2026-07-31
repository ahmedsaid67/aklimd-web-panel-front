'use server'

import { apiClient } from "../../lib/api-client"
import { API_ROUTES } from "../../utils/constant"
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function AracDuzenle(prevState,formData){

    const aracMarkasi = formData.get('aracMarkasi')
    const aracModeli = formData.get('aracModeli')
    const aracPlakasi = formData.get('aracPlakasi')
    const id = formData.get('id')

    const response = await apiClient(`${API_ROUTES.ARACLAR}${id}/`,{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({arac_modeli:aracModeli,arac_markasi:aracMarkasi,arac_plakasi:aracPlakasi})
    })

    if(response.ok){
        //const data= await response.json()
        //console.log(data)
        revalidatePath(`/panel/araclar/${id}/`);
        return {success: true}
    }


    if (!response.ok) {
        if (response.status >= 500) {
            redirect('/internal-server-error');
        }

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {

            const errorData = await response.json();

            //console.log('body var:',errorData)

            return null;
        }


        //console.log('body yok')
        return null;

    }


}