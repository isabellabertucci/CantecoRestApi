const { Meal: MealModel, Meal } = require("../models/Meals");
const { getAll } = require("./itemController");

const mealsController = {

    create: async (req, res) => {
        /* 	#swagger.tags = ['Meals'] */

        try {

            if (req.body.mealName == null || req.body.item == null) {
                return res.status(422).json({ msg: "MealName and Item is required" });
            } else {
                const mealExists = await Meal.findOne({ meal: Meal })
                console.log(mealExists)

                //check if meal exists
                if (mealExists) {
                    return res.status(422).json({ msg: 'Meal alredy exists' })
                }

            }

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
        /* 	#swagger.tags = ['Meals'] */

        try {

            const meals = await MealModel.find()

            res.json(meals);

        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        /* 	#swagger.tags = ['Meals'] */

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
        /* 	#swagger.tags = ['Meals'] */

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
        /* 	#swagger.tags = ['Meals'] */

        try {
            const id = req.params.id

            if (req.body.mealName == null || req.body.item == null) {
                return res.status(422).json({ msg: "mealName and item is required" });
            }

            const update = {
                mealName: req.body.mealName,
                type: req.body.type,
                image: req.body.image,
                hourType: req.body.hourType,
                item: req.body.item,
            };

            const mealUpdated = await MealModel.findByIdAndUpdate(id, update, { new: true });

            if (mealUpdated == null) {
                res.status(404).json({ msg: "Meal not found" });
                return;
            };

            res.status(200).json({ data: mealUpdated, msg: "Successfully update meal" })

        } catch (error) {
            console.log(error);
        }
    }

};

module.exports = mealsController;