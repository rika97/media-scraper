const PORT = process.env.PORT || 5000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => {
    res.json('Welcome to whosampled API')
});

// show all related data (samples, sampled, covers)
app.get('/:artistId/:trackId', (req, res) => {
    const { artistId, trackId } = req.params;
    axios.get(`https://www.whosampled.com/${artistId}/${trackId}`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const allData = [];

            $('.details-inner', html).each(function () {
                    const track = $(this).find('.trackName.playIcon').text();
                    const artist = $(this).find('.trackArtist').find('a').text();
                    
                    allData.push({
                        track: track,
                        artist: artist
                    })
                });

            res.json(allData)
        }).catch((err) => console.log(err));
});

// show samples (won't show if not enough samples)
app.get('/:artistId/:trackId/samples', (req, res) => {
    const { artistId, trackId } = req.params;
    axios.get(`https://www.whosampled.com/${artistId}/${trackId}/samples`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const sampled = [];

            $('.details-inner', html).each(function () {
                    const track = $(this).find('.trackName.playIcon').text();
                    const artist = $(this).find('.trackArtist').find('a').text();
                    
                    sampled.push({
                        track: track,
                        artist: artist
                    })
                });

            res.json(sampled)
        }).catch((err) => console.log(err))
});

// show sampled (won't show if not enough sampled)
app.get('/:artistId/:trackId/sampled', (req, res) => {
    const { artistId, trackId } = req.params;
    axios.get(`https://www.whosampled.com/${artistId}/${trackId}/sampled`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const samples = [];

            $('.details-inner', html).each(function () {
                    const track = $(this).find('.trackName.playIcon').text();
                    const artist = $(this).find('.trackArtist').find('a').text();
                    
                    samples.push({
                        track: track,
                        artist: artist
                    })
                });

            res.json(samples)
        }).catch((err) => console.log(err))
});

// show covers (won't show if not enough covers)
app.get('/:artistId/:trackId/covered', (req, res) => {
    const { artistId, trackId } = req.params;
    axios.get(`https://www.whosampled.com/${artistId}/${trackId}/covered`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const covered = [];

            $('.details-inner', html).each(function () {
                    const track = $(this).find('.trackName.playIcon').text();
                    const artist = $(this).find('.trackArtist').find('a').text();
                    
                    covered.push({
                        track: track,
                        artist: artist
                    })
                });

            res.json(covered)
        }).catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));