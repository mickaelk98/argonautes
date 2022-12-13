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
        .then(Argonautes => {
            if (Argonautes.length !== 0) {
                res.status(200).json(Argonautes)
            } else {
                res.status(200).json({ message: "Aucun argonaute sur la list" })
            }
        })
        .catch(err => res.status(500).json({ err }))
})


//* ajoute un nouvelle argonaute
app.post('/api/argonaute', (req, res) => {
    const argonaute = new Argonaute({
        name: req.body.name
    })
    argonaute.save()
        .then(() => res.status(201).json({ message: `${argonaute.name} a été ajouté sur la liste` }))
        .catch(err => res.status(500).json(err.errors.name.message))

})

module.exports = app;