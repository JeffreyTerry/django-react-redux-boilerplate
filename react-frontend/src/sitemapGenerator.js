require('babel-register')({
    presets: ["env", "react"]
});

const router = require('./routes/sitemap-routes.js').default;
const Sitemap = require('react-router-sitemap').default;

function generateSitemap() {
    return (
        new Sitemap(router)
            .build('https://myapp.org')
            .save('./public/sitemap.xml')
    );
};

generateSitemap();
