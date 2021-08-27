module.exports = {
  siteMetadata: {
    siteUrl: "https://www.matthewmincher.dev",
    title: "Matthew Mincher",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-E3VLJ5TDVZ", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [],
        },
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: 'gatsby-plugin-pdf',
      options: {
        allPages: false,
        paths: ['/cv/'],
        outputPath: '/public/exports',
        filePrefix: 'matthewmincher-',
        styleTagOptions: {
          content: '.constrainedContent { padding: 0 40px; } .afterPageBreak { padding-top: 40px; } .telephone { display: block; } .download { display: none; }'
        }
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `matthewmincher.dev`,
        short_name: `matthewmincher`,
        start_url: `/`,
        background_color: `#f6f4f3`,
        theme_color: `#33ca7f`,
        display: `standalone`,
        icon: `src/images/icon.png`
      },
    },
  ],
};
