let express = require('express');
let app = express();
let webpack = require('webpack');
let config = require('./webpack.config');
let path = require('path');
let compiler = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
}));


app.use(require('webpack-hot-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}));


app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Running at http://localhost:' + PORT);
})