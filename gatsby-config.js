module.exports = {
  siteMetadata: {
    siteUrl: "https://www.matthewmincher.dev",
    title: "Matthew Mincher",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-E3VLJ5TDVZ",
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
