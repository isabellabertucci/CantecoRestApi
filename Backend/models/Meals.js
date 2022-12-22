const mongoose = require ("mongoose");

const { Schema } = mongoose;

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
    itens: {
       type: [itemSchema],
       require: true
       /* como colocar a quantidade? */
    },
},
    {timestamps: true} // controla data de criacao e atualizacao
);

const Meals = mongoose.model("Meals", mealsSchema)

module.exports = Meals; // nao depende do schema do meals 