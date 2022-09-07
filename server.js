const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    let randQuote = getRandomElement(quotes);
    let retObj = {
        quote: randQuote
    }
    res.send(retObj);
});

app.get('/api/quotes', (req, res, next) => {
    let retObj = {};
    if(req.query.person) {
        let resultQuotes = quotes.filter(quote => quote.person.toLowerCase() == req.query.person.toLowerCase());
        retObj = {
            quotes: resultQuotes
        }
        res.send(retObj);
    }else{
        retObj = {
            quotes: quotes
        }
        res.send(retObj);
    }
});

app.post('/api/quotes', (req, res, next) => {
    if(req.query.person && req.query.quote) {
        let newQuote = {
            quote: req.query.quote,
            person: req.query.person
        }
        quotes.push(newQuote);
        res.send(
            {
                quote: newQuote
            }
        )
    } else {
        res.status(400).send();
    }
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})