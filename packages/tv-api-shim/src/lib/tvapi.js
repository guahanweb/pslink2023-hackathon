const axios = require('axios');
const fs = require('fs');
const path = require('path');

const data = (function () {
    const buf = fs.readFileSync(path.join(__dirname, '../data/shows.json'));
    return JSON.parse(buf);
}());

console.log(data);

const api = axios.create({
    baseURL: 'https://api.tvmaze.com/',
    timeout: 1000,
});

async function searchShows(query) {
    const result = await api.get(`/search/shows?q=${query}`);
    return result.data;
}

async function listShows(start = 1, end = 10) {
    let promises = [];
    for (let p = 1; p <= pageCount; p++) {
        promises.push(api.get(`/shows?page=${p}`));
    }

    let output = [];
    const results = (await Promise.all(promises)).forEach(res => output.concat(res.data));
    return output;
}

async function filter(time, genre = false) {
    return data
        .filter(item => {
            // filter out by genre first
            if (genre !== false && !item.show.genres.includes(genre)) return false;
            if (time < item.show.averageRuntime) return false;
            return true;
        });
}

module.exports = {
    searchShows,
    listShows,
    filter,
 };
