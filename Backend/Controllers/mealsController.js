const { Meal: MealModel } = require("../models/Meals");
const { getAll } = require("./itensController");

const mealsController = {

    create: async (req, res) => {
        try {

            const meal = {
                mealName: req.body.mealName,
                type: req.body.type,
                image: req.body.image,
                hourType: req.body.hourType,
                item: req.body.item,
            }

            const response = await MealModel.create(meal);
            res.status(200).json({ response, msg: "successfully created meal" })


        } catch (error) {
            console.log(error);

        }
    },

    getAll: async (req, res) => {
        try {
            const meals = await MealModel.find()

            res.json(meals);

        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {

            const id = req.params.id
            const meal = await MealModel.findById(id)

            if (!meal) {
                res.status(404).json({ msg: "Meals not found" })
                return;
            }
            res.json(meal);

        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id

            const meal = await MealModel.findById(id)

            if (!meal) {
                res.status(404).json({ msg: "Meal not found" });
                return;
            }

            const deletedMeal = await MealModel.findByIdAndDelete(id)

            res.status(200).json({ deletedMeal, msg: "Successfully deleted meal!" })


        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id

            const meal = {
                mealName: req.body.mealName,
                type: req.body.type,
                image: req.body.image,
                hourType: req.body.hourType,
                item: req.body.item,
            };

            const updateMeal = await MealModel.findByIdAndUpdate(id, meal)

            if (!updateMeal) {
                res.status(404).json({ msg: "Meal not found" });
                return;
            };

            res.status(200).json({ updateMeal, msg: "Successfully update meal" })

        } catch (error) {
            console.log(error);
        }
    }

};

module.exports = mealsController;