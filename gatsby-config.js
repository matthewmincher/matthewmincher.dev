module.exports = {
  siteMetadata: {
    siteUrl: "https://www.matthewmincher.dev",
    title: "Matthew Mincher",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
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
      resolve: "gatsby-plugin-pdf-export",
      options: {
        outputPrefix: 'matthewmincher-',
        targetPaths: ['/cv/', '/cv/backend/', '/cv/frontend/'],
        styleOptions: {
          content: '.constrainedContent { padding: 0 40px; } .afterPageBreak { padding-top: 40px; } .telephone { display: block; } .download { display: none; }'
        }
      }
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
