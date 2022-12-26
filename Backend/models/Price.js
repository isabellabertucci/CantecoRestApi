const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
   {
      userType: {
         type: String,
         require: true
      },
      priceWIva: {
         type: String,
         require: true
      },
      priceWoIva: {
         type: String,
         require: true
      }
   },
   { timestamps: true }
);

const Price = mongoose.model("Price", priceSchema);

module.exports = { Price, priceSchema };

