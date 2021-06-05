
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
    return (
      new Sitemap(router)
          .build("https://sample-web.com")
          .save("public/sitemap.xml")
    );
}

const res = generateSitemap();
console.log(res);
