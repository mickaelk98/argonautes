require('dotenv').config()
const express = require('express');
const app = express()
require('./db.config')
const Argonaute = require('./Argonautes.model')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

//* intercepte les requete de type json
app.use(express.json());

//* recupere tout les argonautes
app.get('/api/argonaute', (req, res) => {
    Argonaute.find()
        .then(Argonautes => res.status(200).json(Argonautes))
        .catch(err => res.status(500).json({ err }))
})


//* ajoute un nouvelle argonaute
app.post('/api/argonaute', (req, res) => {
    const argonaute = new Argonaute({
        name: req.body.name
    })
    argonaute.save()
        .then((argonaute) => res.status(201).json(argonaute))
        .catch(err => res.status(400).json({ message: err.errors.name.message }))

})

module.exports = app;