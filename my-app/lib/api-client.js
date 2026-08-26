// lib/api-client.js
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export async function apiClient(endpoint, options = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  // Headerları JavaScript ile güvenli bir şekilde birleştiriyoruz
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Token ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  // API isteğini yap
  const response = await fetch(`${process.env.BACKEND_URL}${endpoint}`, config)
    .catch((err) => {
      // Server ile Bağlantı hatası olduğunda burası çalışır
      return null; // Bağlantı koptuğunda 'null' döner
    }
  );

  // Eğer response null ise, demek ki fetch başarısız oldu
  if (!response) {
    // return {
    //   ok: false,
    //   status: 503,
    //   json: async () => ({ error: 'Sunucu ile iletişim kurulamadı.' })
    // };
    redirect('/error-network');
  }

  // 401 Hata Yönetimi
  if (response.status === 401) {
    if (cookieStore.has('accessToken')) {
      cookieStore.delete('accessToken');
    }
    redirect('/giris-yap');
  }

  return response;
}