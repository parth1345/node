const express = require('express');
const bodyparser = require('body-parser');
const port = 3000;
var app = express();
const inshorts = require('inshorts-news-api');
require('./db')

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

// database
// const Pool = require('pg').Pool;
// const db = new Pool({
//     user: 'dbadmin',
//     password: '123',
//     host: 'localhost',
//     port: 5432,
//     database: 'iblogger'
// });
// db.connect((err) => {
//     if (err) throw err;
//     console.log("Database connected!");
// });


app.get('/', (req, res) => {
    let promise = new Promise((resolve, reject) => {
        var trending = new Array();
        inshorts.getNews(options, (resul) => {
            for (let i = 0; i < resul.length; i++) {
                trending.push(resul[i]);
            }
        })
        resolve(trending)
    })
    promise.then(() => {
        db.query('select * from blog_blog where hidden=false order by id desc', (error, results) => {
            if (error) {
                throw error;
            } else {
                res.render('base', {
                    all_posts: results.rows,
                    trending: trending,
                })
            }
        })
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

app.post('/addpost', (req, res) => {
    res.redirect('/addpost');
});

app.listen(port, () => {
    console.log(`app is running on ${port} port.`);
});