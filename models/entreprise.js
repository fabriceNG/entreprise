const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  nom: String, 
  domaine:String,
  //imageUrl: { type: String, required: true },
  userId:String,
  localisation:String,
  Houverture:String,
  evaluation:Number, 
});

module.exports = mongoose.model('Entreprise', thingSchema);