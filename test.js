const inshorts = require('inshorts-news-api');
//specify language, category of news you want
var options = {
    lang: 'hindi',
    category: 'sports'
}

//use getNews for first time, it will return first 25 posts and an unique id
inshorts.getNews(options, function (result, news_offset) {
    console.log(result);
    console.log(news_offset); //it will be used in getMorePosts
});