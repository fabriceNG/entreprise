const express = require('express');
const Entreprise = require('./models/entreprise');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://FAB_MONGODB:Georgette99@cluster0-4znwz.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  
  app.use(bodyParser.json());

  app.get('/api/entreprise', (req, res, next) => {
    Entreprise.find()
      .then(entreprise => res.status(200).json(entreprise))
      .catch(error => res.status(400).json({ error }));
  });
 // affiche un objet 
  app.get('/api/entreprise/:id', (req, res, next) => {
    Entreprise.findOne({ _id: req.params.id })
      .then(entreprise => res.status(200).json(entreprise))
      .catch(error => res.status(404).json({ error }));
  });


  app.post('/api/entreprise', (req, res, next) => {
    //delete req.body._id;
    const entreprise = new Entreprise({
      ...req.body
    });
    entreprise.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

app.put('/api/entreprise/:id', (req, res, next) => {
  Entreprise.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
 
  app.delete('/api/entreprise/:id', (req, res, next) => {
    Entreprise.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });
  

 
  


  
  
  
  
  
module.exports = app;