module.exports = {
  siteMetadata: {
    title: `GradSuccess Consulting`,
    description: `GradSuccess is an application consulting company, we help students and career professionals with their applications to new opportunities. We provide assistance with resumes, essays and other application materials essential for success`,
    author: `PhosMobile`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GradSuccess Consultancy`,
        short_name: `GradSuccess`,
        start_url: `/`,
        background_color: `#47dcbc`,
        theme_color: `#47dcbc`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "GradsuccessAPI",
        // This is the field under which it's accessible
        fieldName: "Gradsuccess",
        // URL to query from
        url: "https://infinite-cove-53014.herokuapp.com/graphql",
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
