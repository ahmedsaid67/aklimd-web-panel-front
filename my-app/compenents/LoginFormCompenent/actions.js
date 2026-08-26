'use server'
import { cookies } from 'next/headers';
import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';


export async function loginAction(payload){

    const res = await fetch(`${process.env.BACKEND_URL}${API_ROUTES.LOGIN}`,{
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
        
        return { success: true, message: "Giriş işleminiz başarıyla tamamlandı. Yönetim paneline yönlendiriliyorsunuz." };
    }

    if(!res.ok){

        const contentType = res.headers.get("content-type");

        // tanımlanmıs backendde yakalanmış hatalar. yanı body sı olan hatalar. 500den kucuk.

        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            console.log('body var:',errorData)

            if (errorData?.email && errorData?.email[0] === "Bu alan zorunlu.") {
                return { success: false, message: "Lütfen e-posta adresinizi giriniz.", messageType:"email"};
            } 
            else if (errorData?.email && errorData?.email[0] === "Geçerli bir e-posta adresi girin.") {
                return { success: false, message: "Lütfen geçerli bir e-posta adresi giriniz.", messageType:"email"};
            }else if (errorData?.non_field_errors && errorData?.non_field_errors[0] === "Email veya şifre yanlış.") {
                return { success: false, message: "E-posta adresi veya şifre hatalı.", messageType: "credentials" };
            }else {
                return {success:false, message:"Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz.", messageType:"general"}
            }
        }
        //console.log('body yok')

        return {success:false, message:"Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz.", messageType:"general"}
    }

    
}