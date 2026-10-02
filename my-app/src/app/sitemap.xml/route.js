export async function GET() {
  try {
    // Sadece YYYY-MM-DD formatı (SEO için önerilen format)
    const now = new Date().toISOString().split('T')[0];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://www.arabamuayene.com.tr</loc>
          <lastmod>${now}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>https://www.arabamuayene.com.tr/mobil-uygulama</loc>
          <lastmod>${now}</lastmod>
          <changefreq>yearly</changefreq>
          <priority>0.4</priority>
        </url>
        <url>
          <loc>https://www.arabamuayene.com.tr/hakkimizda</loc>
          <lastmod>${now}</lastmod>
          <changefreq>yearly</changefreq>
          <priority>0.4</priority>
        </url>
        <url>
          <loc>https://www.arabamuayene.com.tr/iletisim</loc>
          <lastmod>${now}</lastmod>
          <changefreq>yearly</changefreq>
          <priority>0.4</priority>
        </url>
        <url>
          <loc>https://www.arabamuayene.com.tr/sikca-sorulan-sorular</loc>
          <lastmod>${now}</lastmod>
          <changefreq>yearly</changefreq>
          <priority>0.4</priority>
        </url>
      </urlset>`;

    return new Response(sitemapXml.trim(), {
      headers: { 
        'Content-Type': 'application/xml; charset=utf-8',
        // İsteğe bağlı: Arama motorlarının önbelleklemesi (Cache-Control) eklemek iyi olabilir
        'Cache-Control': 'public, max-age=3600, s-maxage=86400'
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap.', { status: 500 });
  }
}