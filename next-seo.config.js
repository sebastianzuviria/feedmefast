const title =
  'FeedMeFast – The easiest way to add comments or reviews to your static site.';
const description = 'FeedMeFast is being built.';

const SEO = {
  title,
  description,
  canonical: 'https://feedmefast.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://feedmefast.vercel.app',
    title,
    description,
    images: [
      {
        url: 'https://feedmefast.vercel.app/og.svg',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  }
};

export default SEO;