'use server'
import { cookies } from 'next/headers';
import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';


export async function registerAction(payload){

    const res = await fetch(`${process.env.BACKEND_URL}${API_ROUTES.REGISTER}`,{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .catch((err) => {
        // Server ile Bağlantı hatası olduğunda burası çalışır
        return null; // Bağlantı koptuğunda 'null' döner
        }
    );
    

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

        const cookieStore = await cookies(); 
        cookieStore.set('accessToken', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 hafta ekledik (kalıcı olsun diye)
        });
        
        return { success: true, message: "Kayıt işleminiz başarıyla tamamlandı. Yönetim paneline yönlendiriliyorsunuz." };
    }

    if(!res.ok){

        const contentType = res.headers.get("content-type");

        // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.

        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            console.log('body var:',errorData)

            if (errorData?.email && errorData?.email[0] === "Bu alan zorunlu.") {
                return { success: false, message: "Lütfen e-posta adresinizi giriniz.", messageType:"email", step: 1 };
            } 
            else if (errorData?.email && errorData?.email[0] === "Geçerli bir e-posta adresi girin.") {
                return { success: false, message: "Lütfen geçerli bir e-posta adresi giriniz.", messageType:"email", step: 1 };
            }else if(errorData?.email && errorData?.email[0] === "Bu e-posta adresiyle zaten bir kullanıcı var."){
                return { success: false, message: "Bu e-posta adresiyle zaten bir kullanıcı var.", messageType:"email", step: 1  };
            }else if(errorData?.phone_number && errorData?.phone_number[0] === "Bu telefon numarası zaten kayıtlı."){
                return { success: false, message: "Bu telefon numarası zaten kayıtlı.", messageType:"phone", step: 3};
            }else if(errorData?.phone_number && errorData?.phone_number[0] === "Telefon numarası +90 ile başlamalı ve 10 haneli olmalıdır"){
                return { success: false, message: "Telefon numarası +90 ile başlamalı ve 10 haneli olmalıdır", messageType:"phone", step: 3 };
            }else if(errorData?.password && errorData?.password[0] === "Şifreniz en az 8 karakter uzunluğunda olmalıdır."){
                return { success: false, message: "Şifreniz en az 8 karakter uzunluğunda olmalıdır.", messageType:"password", step: 1 };
            }else {
                return {success:false, message:"Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz.", messageType:"general", step: null}
            }
        }
        //console.log('body yok')

        return {success:false, message:"Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz.", messageType:"general", step: null}
    }

    
}