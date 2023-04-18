const express = require('express');
const { searchShows, filter } = require('./lib/tvapi');

function createServer() {
    const app = express();
    
    // set up routes
    app.get('/search', async function (req, res) {
        const query = req && req.query;
        const results = await searchShows(query.q);
        return res.send(results);
    });

    app.get('/filter', async function (req, res) {
        const genre = req.query && req.query.genre;
        const time = req.query && req.query.time;
        const result = await filter(time, genre);

        return res.send(result);
    });

    return app;
}

main();
async function main() {
    const server = createServer();
    server.listen(3000);
}
