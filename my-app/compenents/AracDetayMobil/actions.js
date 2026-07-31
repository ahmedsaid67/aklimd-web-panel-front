'use server'
import { API_ROUTES } from "../../utils/constant"
import { apiClient } from "../../lib/api-client"


export async function AracEkle(data){

    const response = await apiClient(`${API_ROUTES.ARACLAR}${data.id}/`,{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({arac_modeli:data.aracModeli,arac_markasi:data.aracMarkasi,arac_plakasi:data.aracPlakasi})
    })

    if (response.ok){
        const data = await response.json();
        return { success: true, data: data};
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