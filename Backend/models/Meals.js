const mongoose = require("mongoose")

const { itemSchema } = require("./Item");

const mealsSchema = mongoose.Schema(
    {
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
    { timestamps: true }
);

const Meal = mongoose.model("Meal", mealsSchema)

module.exports = { Meal, mealsSchema };