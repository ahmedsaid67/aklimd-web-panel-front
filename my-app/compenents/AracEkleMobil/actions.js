
'use server'

import { API_ROUTES } from "../../utils/constant"
import { apiClient } from '../../lib/api-client';


export async function AracEkle(data){

    const res = await apiClient(API_ROUTES.ARACLAR,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({arac_modeli:data.aracModeli,arac_markasi:data.aracMarkasi,arac_plakasi:data.aracPlakasi})
    })

    if(res.ok){
        return { success: true};
    }


    if (!res.ok) {
        const contentType = res.headers.get("content-type");
        // tanımlanmıs backendde yakalanmış hatalar.
        if (contentType && contentType.includes("application/json")) {
            // front tarafında olası hataları engelleyecek sekılde kodladıgımızdan zaten buraya dusmeyecek
            return null;
        } else {
            redirect('/internal-server-error')
        }
    }





}