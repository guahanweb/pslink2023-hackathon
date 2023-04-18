const { listShows } = require('./lib/tvapi');

main();

async function main() {
    const shows = await listShows(10);

    // filter here
    console.log(shows);
    console.log(shows.length);
}
