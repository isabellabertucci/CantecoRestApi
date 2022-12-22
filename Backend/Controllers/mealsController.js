const MealsModel = require("../models/Meals")

const mealsController = {
        create: async(req, res) => {
            try {

                const meal ={
                    mealName: req.body.mealName,
                    type:eq.body.type,
                    image:eq.body.image,
                    itens:eq.body.itens,
                }

            const response = await MealsModel.create(meal);

            res.status(200).json({response, msg: "successfully created meal"})

                
            } catch (error) {
                console.log(error);
                
            }
        }
}

module.exports = mealsController;