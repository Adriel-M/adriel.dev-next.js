const siteMetadata = {
  title: "Adriel's Thoughts",
  author: 'Adriel Martinez',
  headerTitle: "Adriel's Thoughts",
  description: 'Stuff I think about 🤔',
  language: 'en-us',
  siteUrl: 'https://adriel.dev',
  siteRepo: 'https://github.com/Adriel-M/adriel.dev',
  socialBanner: '/static/images/twitter-card.png',
  github: 'https://github.com/Adriel-M',
  linkedin: 'https://www.linkedin.com/in/adrielmartinez/',
  locale: 'en-US',
  postSummaryLength: 25,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      src: '/stats/script.js',
    },
  },
  search: {
    provider: 'algolia',
    algoliaConfig: {
      // The application ID provided by Algolia
      appId: '2F6FRLRIAP',
      // Public API key: it is safe to commit it
      apiKey: '518da9d8c62bdc48ab2a557b2f91d576',
      indexName: 'adriel',
    },
  },
  emailAddress: process.env.EMAIL_ADDRESS,
  postsInFrontPageCount: 5,
  postsInPostsPageCount: 5,
}

export default siteMetadata
