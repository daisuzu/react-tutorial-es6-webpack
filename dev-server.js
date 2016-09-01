var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var bodyParser = require('body-parser');

var config = require('./webpack.config.js');
config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  setup: function (app) {
    var comments = [
      {
        "id": 1388534400000,
        "author": "Pete Hunt",
        "text": "Hey there!"
      },
      {
        "id": 1420070400000,
        "author": "Paul O’Shannessy",
        "text": "React is *great*!"
      }
    ];

    app.use(bodyParser.json());

    app.get('/api/comments', function(req, res) {
      res.json(comments);
    });

    app.post('/api/comments', function(req, res) {
      var newComment = {
        id: Date.now(),
        author: req.body.author,
        text: req.body.text,
      };
      comments.push(newComment);
      res.json(comments);
    });
  }
});
server.listen(8080);
