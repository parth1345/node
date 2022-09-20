const db = require('../db');
const Blog = db.Blog;
const inshorts = require('inshorts-news-api');
var options = {
    lang: 'en',
    category: 'sports'
}

module.exports = {
    insert_blog,
    get_allblogs,
    get_trending,
};

async function insert_blog(title, slug, author, content) {
    await Blog.create({
        title,
        slug,
        author,
        content
    });
}
async function get_allblogs() {
    const blogs = await Blog.findAll();
    // console.log(`blogs in controller: ${blogs}`)
    return blogs;
}
async function get_trending() {
    var trending = new Array();
    await inshorts.getNews(options, (result) => {
        for (let i = 0; i < result.length; i++) {
            trending.push(result[i]);
        }
    })
    return trending;
}