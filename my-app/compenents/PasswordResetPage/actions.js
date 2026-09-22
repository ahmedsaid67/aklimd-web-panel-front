'use server'

import { API_ROUTES } from '../../utils/constant';
import { redirect } from 'next/navigation';

export async function ResetPassword({ code, newPassword }) {
    const res = await fetch(`${process.env.BACKEND_URL}${API_ROUTES.RESET_PASSWORD}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, new_password: newPassword }),
    }).catch((err) => {
        return null;
    });

    if (!res) {
        redirect('/error-network');
    }

    if (res.status >= 500) {
        redirect('/internal-server-error');
    }

    if (res.ok) {
        return { 
            success: true, 
            message: "Şifreniz başarıyla sıfırlandı. Giriş sayfasına yönlendiriliyorsunuz..." 
        };
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        console.log("errorData:",errorData)

        if (errorData?.detail) {
            if (errorData.detail === "Code and new password are required.") {
                return { success: false, message: "Lütfen kodu ve yeni şifrenizi giriniz.", messageType: "general" };
            }
            if (errorData.detail === "Invalid or expired code.") {
                return { success: false, message: "Geçersiz kod. Lütfen tekrar deneyin.", messageType: "general" };
            }
            if (errorData.detail === "Code has expired.") {
                return { success: false, message: "Kodun süresi dolmuş. Lütfen yeni bir kod isteyin.", messageType: "general" };
            }
            return { success: false, message: "Beklenmeyen bir hata oluştu, lütfen daha sonra deneyiniz.", messageType: "general" };
        }
        return { success: false, message: "Beklenmeyen bir hata oluştu, lütfen daha sonra deneyiniz.", messageType: "general" };
    }

    return { success: false, message: "Beklenmeyen bir hata oluştu, lütfen daha sonra deneyiniz.", messageType: "general" };
}