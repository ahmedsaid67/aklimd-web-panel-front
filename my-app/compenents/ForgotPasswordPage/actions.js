'use server'

import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';


export async function ForgotPassword(email){

    const res = await fetch(`${process.env.BACKEND_URL}${API_ROUTES.RESET_PASSWORD_CODE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    }).catch((err) => {
        // Server ile bağlantı hatası olduğunda burası çalışır
        return null;
    });


    // 1. Ağ (Network) Seviyesi Kopması (Sunucuya hiç ulaşılamadı)
    if (!res) {
        redirect('/error-network');
    }

    // 2. Sunucu Kaynaklı Kritik Hatalar (500, 503, 504 vb.)
    if (res.status >= 500) {
        redirect('/internal-server-error');
    }




    if (res.ok) {
        const data =await res.json();
        console.log(data)
        
        return { 
            success: true, 
            message: "Doğrulama kodu e-posta adresinize gönderildi. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol edin. Şifre sıfırlama sayfasına yönlendiriliyorsunuz..." 
        };
    }






    if(!res.ok){

        const contentType = res.headers.get("content-type");

        // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.

        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            //console.log('body var:',errorData)

            if (errorData?.email) {
                const emailError = errorData.email[0];

                if (emailError === "E-posta gerekli.") {
                    return { success: false, message: "Lütfen e-posta adresinizi giriniz.", messageType: "email" };
                } 
                if (emailError === "Geçerli bir e-posta adresi girin.") {
                    return { success: false, message: "Lütfen geçerli bir e-posta adresi giriniz.", messageType: "email" };
                }
                if (emailError === "Bu e-posta adresine sahip bir kullanıcı bulunamadı.") {
                    return { success: false, message: "Bu e-posta adresine kayıtlı bir kullanıcı bulunamadı.", messageType: "email" };
                }
                return {success:false, message:"Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz.", messageType:"general"}
            }
            return {success:false, message:"Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz.", messageType:"general"}
        }
        //console.log('body yok')

        return {success:false, message:"Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz.", messageType:"general"}
    }













}