

const siteConfig = {
  copyright: `Copyright © ${new Date().getFullYear()} Appulse Software B.V. All Rights Reserved.`,
  author: {
    name: "Stephane",
    github: "https://github.com/waptik",
    twitter: "https://twitter.com/_waptik",
    email: "info@klerye.com",
  },
  seo: {
    defaultTitle: "Project",
    titleTemplate: "%s - Project",
    description: "My boilerplate project based on top on turborepo.",
    siteUrl: "https://github.com/waptik/turborepo-boilerplate",
    twitter: {
      handle: "@_waptik",
      site: "@_waptik",
      cardType: "summary_large_image",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://github.com/waptik/turborepo-boilerplate",
      title: "Project",
      description:  "My boilerplate project based on top on turborepo.",
      site_name: "Project: My boilerplate project based on top on turborepo.",
      images: [
        {
          url: "https://github.com/waptik/turborepo-boilerplate/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Project: My boilerplate project based on top on turborepo.",
        },
        {
          url: "https://github.com/waptik/turborepo-boilerplate/twitter-og-image.jpg",
          width: 1012,
          height: 506,
          alt: "Project: My boilerplate project based on top on turborepo.",
        },
      ],
    },
  },
};

export default siteConfig;
