'use server';
import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant';
import { revalidatePath } from 'next/cache'; // 'next/navigation' yerine buradan alınmalı
import { redirect } from 'next/navigation';



// 2. Seçilenleri durduran action
export async function durdurHatirlatmaTarihleri(selectedIds) {
    const res = await apiClient(API_ROUTES.HATIRLATMA_TARIHI_DURDUR_WEB, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ list: selectedIds })
    });

    if (res.ok) {
        const data = await res.json();
        //console.log("data:",data)
        // Ana sayfayı ve hatırlatıcı rotalarını tazeleyelim
        revalidatePath('/panel/hatirlaticilar');
        // Backend'den gelen dinamik mesajı ve başarı durumunu frontend'e iletiyoruz
        return { 
            success: true, 
            message: data.message 
        };
    }

    if (!res.ok) {
        if (res.status >= 500) {
            redirect('/internal-server-error');
        }

        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            return { status: "error", message: "Bir hata oluştu daha sonra tekrar deneyiniz" };
        }

        return { status: "error", message: "Bir hata oluştu daha sonra tekrar deneyiniz" };
    }
}