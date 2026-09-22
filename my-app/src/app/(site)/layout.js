import { cookies } from 'next/headers';
import Navbar from "../../../compenents/Navbar/page";
import Foother from '../../../compenents/Foother/page'
import styles from './page.module.css'
import CookieConsent from '../../../compenents/CookieConsent/page';


export default async function SiteLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken');
  const isAuthenticated = !!token;

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className={styles.mainContent}>
        {children}
      </div>
      <Foother />
      <CookieConsent />
    </>
  );
}