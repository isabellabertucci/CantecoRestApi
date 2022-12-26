const mongoose = require ("mongoose");
const { Schema } = mongoose;

const priceSchema = new Schema({
   userType: {
    type: String,
    require: true,
   },

   priceWIva: {
    type: String,
    require: true,
   },
   priceWoIva: {
    type: String,
    require: true,
   },
});

const Price = mongoose.model("Price", priceSchema)
module.exports = {
    Price,
    priceSchema,
};