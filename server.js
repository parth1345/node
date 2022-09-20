const express = require('express');
const bodyparser = require('body-parser');
const port = 3000;
var app = express();
const inshorts = require('inshorts-news-api');
require('./db')
const { insert_blog, get_allblogs, get_trending } = require('./controllers/blog_controller');

// database
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'dbadmin',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'iblogger'
});
db.connect((err) => {
    if (err) throw err;
    console.log("Database connected!");
});

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use('/static', express.static(__dirname + '/public'));
app.use('/media', express.static(__dirname + '/media'));

var options = {
    lang: 'en',
    category: 'sports'
}

app.get('/', async (req, res) => {
    var blogs = await get_allblogs();
    var trending = await get_trending();
    res.render('base', {
        all_posts: blogs.rows,
        trending: trending
    })
});


app.get('/blogpost/:slug', (req, res) => {
    var slug = req.params.slug;
    var query = `SELECT * FROM blog_blog WHERE slug='${slug}'`;
    db.query(query, (error, results) => {
        if (error) {
            throw error;
        } else {
            var post = results.rows[0]
            res.render('blogpost', {
                post: post
            })
        }
    });

})

app.get('/addpost', (req, res) => {
    res.render('addpost');
});

app.post('/addpost', async (req, res) => {
    var title = req.body.title;
    var slug = 'new-title';
    var author = 'parthshah';
    var content = req.body.content;
    const blog = await insert_blog(title, slug, author, content)
        .then(() => {
            console.log('blog has been addes')
            res.redirect('/addpost');
        })
        .catch((err) => {
            console.log(err)
        })
});

app.listen(port, () => {
    console.log(`app is running on ${port} port.`);
});