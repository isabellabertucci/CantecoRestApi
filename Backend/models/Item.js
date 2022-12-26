const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            require: true
        },
        kcal: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
        protein: {
            type: Number,
            require: false
        },
        fat: {
            type: Number,
            require: false
        },
        carbs: {
            type: Number,
            require: false
        },
        water: {
            type: Number,
            require: false
        },
        carbon: {
            type: Number,
            require: false
        },
        image: {
            type: String,
            require: false
        },
    },
    { timestamps: true }

)

const Item = mongoose.model("Item", itemSchema)

module.exports = {
    Item,
    itemSchema,
};



