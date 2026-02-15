import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export function SEO({
  title = "Flesh to Death Honey Co. | Biker Apothecary",
  description = "Flesh to Death Honey Co. — The Biker Apothecary. Handcrafted beeswax products, rebellious apparel, and the BuzzKill beekeeping app. Born from the hive, built for the road.",
  keywords = "beeswax products, biker apparel, motorcycle lifestyle, beekeeping, tattoo culture, handcrafted balms, BuzzKill app",
  image = "https://fleshtodeathhoney.com/images/og-image.jpg",
  url = "https://fleshtodeathhoney.com/",
  type = "website",
  structuredData,
}: SEOProps) {
  const fullTitle = title.includes("Flesh to Death") ? title : `${title} | Flesh to Death Honey Co.`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Flesh to Death Honey Co." />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
