const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const port = 3000;
var app = express();
const inshorts = require('inshorts-news-api');
<<<<<<< HEAD
const Sequelize = require('sequelize')
=======
const fs = require('fs')
var sleep = require('system-sleep');
>>>>>>> parent of 9b96c91 (promise working on home page trending data)

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
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


const connect_db = async function () {
    const sequelize = new Sequelize('postgres://dbadmin:123@localhost:5432/iblogger');
    try {
        await sequelize.authenticate();
        console.log('connection has been made');
    } catch (err) {
        console.log(err);
    }
}
connect_db()


app.get('/', (req, res) => {
    // inshorts.getNews(options, function (resul, news_offset) {
    //     for (let i = 0; i < resul.length; i++) {
    //         trending.push(resul[i]);
    //     }
    // });

    // sleep(0.5 * 1000)
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
            }
            else {
                res.render('base', {
                    all_posts: results.rows,
                    trending: trending,
                })
            }
        })
    })

    // res.render('base')
});

app.get('/blogpost/:slug', (req, res) => {
    var slug = req.params.slug;
    var query = `SELECT * FROM blog_blog WHERE slug='${slug}'`;
    db.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        else {
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
    var title = req.body.title;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`app is running on ${port} port.`);
});