const config = require("./config");
const fs = require("fs");
const common = require("./common");

const listpage = (posts, pageTitle) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.blogDescription}" />
        <link rel="stylesheet" href="./styles/fonts.css">
        <link rel="stylesheet" href="./styles/main.css">
        <!-- Google tag (gtag.js) -->
        ${config.googleAnalyticsID ? common.googleAnalytics(config.googleAnalyticsID) : ""}
        <title>${config.blogName}: ${pageTitle}</title>
        ${common.openGraph(
          "website",
          config.blogName,
          `${config.blogsite}/posts.html`,
          `${config.blogName}: ${pageTitle}`,
          config.blogDescription,
          config.image,
        )}
    </head>
    <body>
        <div class="content">
            <header>
                <div class="main">${config.blogName}</div>
                <nav>
                  <a href="/">Home</a>
                  ${pageTitle}
                  <a href="/about.html">About</a>
                  <a href="/tags">Tags</a>
                </nav>
            </header>
              <h1 class="page-title">${pageTitle}</h1>
              <ul class="posts">
                ${posts
                  .map(
                    (post) => `<li class="post">
                    <a href="./${post.path}">${
                      post.attributes.title
                    }</a><span class="meta">
                        ${new Date(post.attributes.date).toDateString()}</span>
                    </li>`,
                  )
                  .join("")}
              </ul>
            <footer>
              <div style="display:flex">
                <a class="soc" href="https://github.com/joone/fosscomics" rel="me" title="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                <a class="border"></a><a class="soc" href="https://twitter.com/fosscomics/" rel="me" title="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                <a class="border"></a>
              </div>
              <div class="footer-info">
                ${`© ${new Date().getFullYear()} ${
                  config.authorName
                } | <a href="https://github.com/joone/fosscomics">fosscomics v${config.version}</a> | Published on ${config.date_time}`}
              </div>
            </footer>
        </div>
    </body>
</html>
`;

const createAllPostsPage = (posts) => {
  const pageTitle = "All posts";
  fs.writeFile(
    `${config.dev.outdir}/posts.html`,
    listpage(posts, pageTitle),
    (e) => {
      if (e) throw e;
      console.log(`posts.html was created successfully`);
    },
  );
};

module.exports = {
  createAllPostsPage: createAllPostsPage,
};
