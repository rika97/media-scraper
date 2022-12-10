const PORT = process.env.PORT || 5000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => {
    res.json('Welcome to media zap scraper API')
});

// show all related data (per each council)
// app.get('/:give name here', (req, res) => {
    // const { give name here } = req.params;
    // axios.get(`add link here`)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const allData = [];

            // $('add stuff here').each(function () {
                    const info = $(this).text();
                    
                    allData.push({
                        info: info,
                    })
                });

            res.json(allData)
        }).catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));