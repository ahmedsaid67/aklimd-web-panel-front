'use server'
import { cookies } from 'next/headers';
import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache'
import { apiClient } from '../../lib/api-client';

export async function updateAction(payload){

    console.log("payload:",payload)

    const res = await apiClient(`${API_ROUTES.BILLING_PROFILE}${payload.id}/`,{
        method:"PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    



    if (res.ok) {
        revalidatePath('/panel/profil'); 
        const data =await res.json();
        console.log(data)

        return { success: true, message: "Bilgileriniz başarıyla kaydedildi." };
    }

    if(!res.ok){
        if (res.status >= 500) {
            redirect('/internal-server-error');
        }

        const contentType = res.headers.get("content-type");

        // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.

        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            //console.log('body var:',errorData)

            if (errorData?.email && errorData?.email[0] === "Bu alan zorunlu.") {
                return { success: false, message: "Lütfen e-posta adresinizi giriniz.", messageType:"field" };
            }else if (errorData?.email && errorData?.email[0] === "Geçerli bir e-posta adresi girin.") {
                return { success: false, message: "Lütfen geçerli bir e-posta adresi giriniz.", messageType:"field" };
            }
            
            
            else if (errorData?.phone_number && errorData?.phone_number[0] === "Bu alan zorunlu.") {
                return { success: false, message: "Lütfen telefon numarasını giriniz.", messageType:"field" };
            }else if(errorData?.phone_number && errorData?.phone_number[0] === "Telefon numarası +90 ile başlamalı ve 10 haneli olmalıdır. Örn: +905xxxxxxxxx"){
                return { success: false, message: "Telefon numarası +90 ile başlamalı ve 10 haneli olmalıdır", messageType:"field" };
            }else if(errorData?.phone_number && errorData?.phone_number[0] === "Bu alanın 13 karakterden fazla karakter barındırmadığından emin olun."){
                return { success: false, message: "Telefon numarası +90 ile başlamalı ve 10 haneli olmalıdır", messageType:"field" };
            }



            return {success:false, message:"Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz.", messageType:"general"}

        }
        //console.log('body yok')

        return {success:false, message:"Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz.", messageType:"general"}
    }

    
}