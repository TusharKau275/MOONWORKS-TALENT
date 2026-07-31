/**
 * Pre-built structured data (JSON-LD) schema generators for SEO.
 */

const SITE_URL = 'https://moonworks-talent-rho.vercel.app';

export const SITE_URL_CONST = SITE_URL;

/** Organization schema — use on homepage */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Moonworks Talent',
  url: SITE_URL,
  logo: `${SITE_URL}/moon-logo-transparent.png`,
  description:
    'Moonworks Talent offers 100% free, remote internships for students and freshers across India. MSME registered & Udyam certified.',
  email: 'moonworks.talent@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Haryana',
    addressCountry: 'IN',
  },
  sameAs: [],
});

/** WebSite schema — use on homepage for sitelinks search */
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Moonworks Talent',
  url: SITE_URL,
});

/** FAQPage schema — use on how-it-works page */
export const getFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
});

/** BreadcrumbList schema */
export const getBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
