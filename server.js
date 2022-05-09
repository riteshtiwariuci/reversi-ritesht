/* Set up the static file server */
let static = require('node-static');

/* Set up the http server library */
let http = require('http');

/* adding path dependency */
let path = require('path');

/* Assume that we are running on Heroku */
let port = process.env.PORT;
let directory = __dirname + '/public/index.html';

/* IF we aren't on Heroku, then we need to adjust our port and directory */
if ((typeof port == 'undefined') || (port === null)) {
    port = 8124;
    directory = './public';
}

/* Set up our static file web server to deliver files from the filesystem */
let file = new static.Server(directory);

let app = http.createServer(
    function(request, response) {
        request.addListener('end',
        function() {
            file.serve(request, response);
        }
        )
    }
).listen(port);
console.log('The server is running');


