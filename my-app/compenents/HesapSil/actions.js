'use server'
import { cookies } from 'next/headers';
import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';

export async function hesapSilAction(payload){

    const res = await fetch(`${process.env.BACKEND_URL}${API_ROUTES.USER_DELETE}`,{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    .catch(() => {
        return null; 
    });
    
    if (!res) {
        redirect('/error-network');
    }

    if (res.status >= 500) {
        redirect('/internal-server-error');
    }

    if (res.ok) {
        const data = await res.json();
        console.log(data);

        // Hesap başarıyla silindi, çerezi temizle
        const cookieStore = await cookies();
        cookieStore.delete('accessToken');

        return { success: true, message: "Hesap silme işleminiz başarıyla tamamlandı." };
    }

    if (!res.ok) {
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            console.log('body var:', errorData);

            const backendError = errorData?.error;

            // Spesifik yakalama ve kendi özelleştirilmiş yanıtlarımız:
            if (backendError === 'Email ve şifre gereklidir.') {
                return { 
                    success: false, 
                    message: "Lütfen e-posta ve şifre alanlarını eksiksiz doldurunuz.", 
                    messageType: "credentials" 
                };
            } 
            
            if (backendError === 'Bu e-posta ile kayıtlı bir kullanıcı bulunamadı.') {
                return { 
                    success: false, 
                    message: "E-posta adresi veya şifre hatalı.", // guvenlık acısından hangısıdne oldugunu bellı etmıyoruz
                    messageType: "credentials" 
                };
            }

            if (backendError === 'Şifre yanlış. Hesap silinemedi.') {
                return { 
                    success: false, 
                    message: "E-posta adresi veya şifre hatalı.", 
                    messageType: "credentials" 
                };
            }

            // Eşleşmeyen diğer durumlar için genel dönüş
            return { 
                success: false, 
                message: "Beklenmeyen bir hata oluştu, lütfen daha sonra tekrar deneyiniz.", 
                messageType: "general" 
            };
        }

        return { success: false, message: "Beklenmeyen bir hata oluştu, lütfen daha sonra tekrar deneyiniz.", messageType: "general" };
    }
}