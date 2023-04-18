const axios = require('axios');
const fs = require('fs');
const path = require('path');

const data = (function () {
    const buf = fs.readFileSync(path.join(__dirname, '../data/output.json'));
    return JSON.parse(buf);
}());

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
    for (let p = start; p <= end; p++) {
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
            try {
                if (genre !== false && !item.genres.includes(genre)) return false;
                if (time < item.averageRuntime) return false;
                return true;
            } catch (e) {
                console.error(e);
                console.log(item);
                return false;
            }
        });
}

module.exports = {
    searchShows,
    listShows,
    filter,
 };
