const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cheerio = require('cheerio');
const cors = require('cors')

const app = express();
const corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static('public/'));



app.get('/', (req, res, next)=>{
    res.sendFile('index.html',{ root:'../public' })
})

app.get('/scrape', async (req, res, next)=>{
    const html = await axios.post('https://www.psychologytoday.com/us/therapists?search=17701')
    const $ = await cheerio.load(html.data);
    let data = [];
    $('.row .teletherapy ').each((i, elem) => {
        data.push({
            image: $(elem).find('img.result-photo').attr('src'),
            title: $(elem).find('a.result-name').text().trim(),
            verified: $(elem).find('.verified-icon .rounded .hidden-sm-down').text(),
            type: $(elem).find('.result-suffix .result-suffix-verified').text(),
            excerpt: $(elem).find('.result-desc .hidden-sm-down').text().trim(),
            phone: $(elem).find('.result-phone .hidden-xs-down').text(),
            link: $(elem).find('.result-name').attr('href')
        })
    });

    res.send(data)
})


app.listen(3001)
