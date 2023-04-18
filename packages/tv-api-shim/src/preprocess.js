const { listShows } = require('./lib/tvapi');
const fs = require('fs');
const path = require('path');

main();

async function main() {
    const promises = [];

    for (let p = 0; p <= 27; p++) {
        promises.push(new Promise((resolve, reject) => {
            setTimeout(async () => {
                console.log('running:', p);
                const start = (p * 10) + 1;
                const end = start + 10;
                const output = await listShows(start, end);

                resolve(output);
            }, p * 11000);
        }));
    }

    const shows = (await Promise.all(promises)).reduce((prev, curr, index) => {
        return prev.concat(curr);
    }, []);

    // write to file
    fs.writeFileSync(path.join(__dirname, './data/sample.json'));

    // filter here
    console.log(shows);
    console.log(shows.length);
}
