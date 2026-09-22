'use server';

import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant'; // Veya senin API route sabitlerinin olduğu yer
import { redirect } from 'next/navigation';

// ... (diğer action fonksiyonların burada duruyor)

export async function odemeBaslat(packageId) {
    const res = await apiClient(API_ROUTES.ODEME_BASLAT.replace("id",packageId), {
        method: 'POST',
    });

    if (res.ok) {
        const data = await res.json();
        return { success: true, token: data.token };
    }

    console.log("res:",res)

    if (!res.ok) {
        if (res.status >= 500) {
            redirect('/internal-server-error');
        }

        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            console.log("errorData:",errorData)
            return { success: false, message: errorData.message || errorData.detail || "Ödeme başlatılamadı." };
        }

        console.log("bodysiz error")

        return { success: false, message: "Ödeme başlatılamadı." };
    }
}