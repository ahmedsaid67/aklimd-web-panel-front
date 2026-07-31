// app/login/actions.js
'use server'
import { cookies } from 'next/headers';
import { API_ROUTES } from '../../utils/constant';

export async function loginAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch(`${process.env.BACKEND_URL}${API_ROUTES.LOGIN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // 1. Email geçerli değilse
    if (data.email && data.email.some(msg => msg.includes('Geçerli bir e-posta adresi girin.'))) {
      return { error: 'Lütfen geçerli bir email adresi giriniz.' };
    }
    
    // 2. Email veya şifre yanlışsa (non_field_errors)
    if (data.non_field_errors && data.non_field_errors.some(msg => msg.includes('Email veya şifre yanlış.'))) {
      return { error: 'Email veya şifre hatalı.' };
    }

    // 3. Genel/Diğer hatalar
    return { error: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyiniz.' };
  }

  // Başarılı giriş
  const cookieStore = await cookies(); // await ekledik
  cookieStore.set('accessToken', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 hafta ekledik (kalıcı olsun diye)
  });

  console.log(data)

  return { success: true };
}