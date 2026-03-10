const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Adrián Freisinger | Software Engineer',
    description:
      'Software Engineer specializing in DevOps, automation, cloud infrastructure and backend development.',
    author: 'Adrián Freisinger',
    siteUrl: 'https://adrianfreisinger.com',
    image: '/og.png',
    twitterUsername: '@afreisinger',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Adrián Freisinger',
        short_name: 'Adrián Freisinger',
        start_url: '/',
        background_color: config.colors.darkNavy,
        theme_color: config.colors.navy,
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },

    // `gatsby-plugin-offline`,

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `@pauliescanlon/gatsby-remark-sticky-table`,

          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },

          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
            },
          },

          {
            resolve: 'gatsby-remark-code-titles',
          },

          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
            },
          },

          // ---------------------------
          // ESTE ES EL PLUGIN NUEVO
          // Genera IDs en los headings para que los links del TOC funcionen
          // ---------------------------
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false, // evita que aparezca el # al lado del heading
            },
          },
        ],
      },
    },

    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['UA-45666519-2'],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
  ],
};
