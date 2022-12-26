const { Item: ItemModel } = require("../models/Item.js")

const itemController = {

    create: async (req, res) => {
        try {

            if(req.body.itemName == null ||req.body.kcal == null || req.body.quantity == null) {
                return res.status(422).json({ msg: "ItemName and Kcal also Quantity is required" }); 
            }
    
            const item = {
                itemName: req.body.itemName,
                kcal: req.body.kcal,
                quantity: req.body.quantity,
                protein: req.body.protein,
                fat: req.body.fat,
                carbs: req.body.carbs,
                water: req.body.water,
                carbon: req.body.carbon,
                image: req.body.image
            }

            const response = await ItemModel.create(item);

            res.status(200).json({ response, msg: "successfully created item" })

        } catch (error) {

            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const item = await ItemModel.find();
            res.json(item);

        } catch (error) {
            console.log(error);
        }
    },

    get: async (req, res) => {
        try {

            const id = req.params.id
            const item = await ItemModel.findById(id)

            if (!item) {
                res.status(404).json({ msg: "Item not found" });
                return;
            }

            res.json(item)

        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id

            const item = await ItemModel.findById(id)

            if (!item) {
                res.status(404).json({ msg: "Item not found" });
                return;
            }

            const deletedItem = await ItemModel.findByIdAndDelete(id)

            res.status(200).json({ deletedItem, msg: "Item deleted!" })


        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {

        const id = req.params.id

        if(req.body.itemName == null ||req.body.kcal == null || req.body.quantity == null) {
            return res.status(422).json({ msg: "ItemName and Kcal also Quantity is required" }); 
        }
    
        const item = {
            itemName: req.body.itemName,
            kcal: req.body.kcal,
            quantity: req.body.quantity,
            protein: req.body.protein,
            fat: req.body.fat,
            carbs: req.body.carbs,
            water: req.body.water,
            carbon: req.body.carbon,
            image: req.body.image
        };

        const updatedItem = await ItemModel.findByIdAndUpdate(id, item, {new: true});

        if (updatedItem == null) {
            res.status(404).json({ msg: "Item not found" });
            return;
        }

        res.status(200).json({data: updatedItem, msg: "Item Updated" })
    },

}

module.exports = itemController;

