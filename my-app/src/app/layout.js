import "./globals.css";
import GoogleAnalyticsManager from "../../compenents/GoogleAnalyticsManager/page"
export const metadata = {
  title: "Aklımda",
    icons: {
    icon: '/aklimda-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <GoogleAnalyticsManager />
        {children}
      </body>
    </html>
  );
}