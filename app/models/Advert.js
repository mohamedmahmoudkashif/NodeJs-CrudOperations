'use strict';

// get an instance of mongoose 
// mongoose is ODM: object document mapper
const mongoose = require('mongoose');

/**
 * @author Mohamed Kashif
 */

 // We could create an index of any field for example if we want to add an endpoint to search for specific
 // advert
var AdvertSchema = new mongoose.Schema({
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true }, //
  fuel: { type: String, enum: ['gasoline', 'diesel'], required: true },
  price: { type: Number, required: true },
  new: { type: Boolean, required: true },
  mileage: { type: Number, validate: [checkIfUsed, 'The car should be used to have mile age'] },
  first_registration: { type: { year: Number, month: Number, day: Number }, validate: [checkIfUsed, 'The car should be used to have first registration'] },
  // car_photo
  // no_views
  // Country
  // No_of_doors
  // Gear i.e Automatic or manuel
  

},
  { timestamps: true }

);
/**
 * 
 * @param {boolean} value 
 */
// if the type of car is used then allow mileage and first registeration,
// else if the car is new the dont allow mileage and first registeration
function checkIfUsed(value) {
  console.log(value)
  console.log(this.new == false);
  return this.new == false;
}

mongoose.model('Advert', AdvertSchema);

module.exports = mongoose.model('Advert');