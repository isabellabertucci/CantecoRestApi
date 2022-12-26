const mongoose = require ("mongoose")
const {Schema} = mongoose

const {itemSchema} = require("./Item");

const mealsSchema = new Schema({
    mealName: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: false
    },
    hourType: {
        type: String,
        require: false
    },

    item: {
       type: [itemSchema],
       require: true
    },
},
    {timestamps: true} // controla data de criacao e atualizacao
);

const Meal = mongoose.model("Meal", mealsSchema)

module.exports = {
Meal,
mealsSchema, 
}; // nao depende do schema do meals 