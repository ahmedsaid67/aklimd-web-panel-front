'use server';

import { apiClient } from '../../lib/api-client';
import { API_ROUTES } from '../../utils/constant';
import { headers } from 'next/headers'; // 1. headers'ı import ettik
import { redirect } from 'next/navigation';

export async function odemeBaslat(packageId) {
    // 2. Tarayıcıdan gelen isteğin IP'sini yakaladık
    const headerList = await headers();
    const clientIp = headerList.get("x-forwarded-for") || headerList.get("x-real-ip");

    // 3. İstek atarken X-Forwarded-For başlığını özel olarak ekledik
    const res = await apiClient(API_ROUTES.ODEME_BASLAT.replace("id", packageId), {
        method: 'POST',
        headers: {
            ...(clientIp && { 'X-Forwarded-For': clientIp }),
        },
    });

    if (res.ok) {
        const data = await res.json();
        return { success: true, token: data.token };
    }

    if (!res.ok) {
        if (res.status >= 500) {
            redirect('/internal-server-error');
        }

        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            return { success: false, message: "Ödeme başlatılamadı. Daha sonra tekrar deneyiniz." };
        }

        return { success: false, message: "Ödeme başlatılamadı. Daha sonra tekrar deneyiniz." };
    }
}
