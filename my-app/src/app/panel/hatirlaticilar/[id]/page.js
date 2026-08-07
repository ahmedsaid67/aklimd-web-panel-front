import Link from "next/link";

export default async function DirectFullPage({ params }) {
    return (
        <div
            style={{
                minHeight: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                fontFamily: "sans-serif",
                color: "#334155",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "440px",
                    padding: "32px 24px",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
                    textAlign: "center",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        backgroundColor: "#eff6ff",
                        color: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 18px",
                        fontSize: "22px",
                        fontWeight: "600",
                    }}
                >
                    i
                </div>

                <h2
                    style={{
                        margin: "0 0 12px",
                        fontSize: "clamp(18px, 4vw, 22px)",
                        fontWeight: "600",
                        color: "#0f172a",
                    }}
                >
                    Hatırlatma Tarihleri
                </h2>

                <p
                    style={{
                        color: "#64748b",
                        fontSize: "clamp(14px, 3.5vw, 15px)",
                        lineHeight: "1.7",
                        marginBottom: "24px",
                    }}
                >
                    Hatırlatma tarihleri bu alanda doğrudan
                    listelenmemektedir. İlgili kayıtların detaylarına erişmek
                    için lütfen hatırlatıcılar tablosunu kullanınız.
                </p>

                <Link
                    href="/panel/hatirlaticilar"
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "13px 16px",
                        backgroundColor: "#1d64f2",
                        color: "#fff",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "15px",
                        boxSizing: "border-box",
                    }}
                >
                    Hatırlatıcılar Sayfasına Dön
                </Link>
            </div>
        </div>
    );
}