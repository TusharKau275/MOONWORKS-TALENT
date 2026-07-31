import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://moonworks-talent-rho.vercel.app';
const SITE_NAME = 'Moonworks Talent';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * SEO component — renders unique <head> tags per page.
 *
 * @param {Object} props
 * @param {string} props.title — Page-specific title
 * @param {string} props.description — Page-specific meta description (max ~155 chars)
 * @param {string} props.path — Route path (e.g. "/about")
 * @param {string} [props.ogImage] — Override OG image URL
 * @param {string} [props.ogType] — OG type, defaults to "website"
 * @param {Object} [props.structuredData] — JSON-LD structured data object
 */
const SEO = ({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  structuredData = null,
}) => {
  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;


