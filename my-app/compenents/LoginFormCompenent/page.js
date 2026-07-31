'use client';
import styles from './page.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useActionState } from 'react';
import { loginAction } from './actions';


export default function Page(){

    const [state, formAction, pending] = useActionState(loginAction, null);
    


    return(
        <div className={styles.mainContainer}>
            <form action={formAction} className={styles.formContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.inputContainer}>
                        <input
                            name="email"
                            className={styles.inputClass}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            name="password"
                            className={styles.inputClass}
                            placeholder="Şifre"
                            required
                        />
                    </div>
                    <button type="submit" disabled={pending} className={styles.buttonContainer}>Giriş Yap</button>
                </div>
                <div className={styles.bottomContainer}>
                    <div className={styles.errorText}>{state?.error}</div>
                </div>
            </form>
        </div>
    )
}