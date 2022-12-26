const { Price: PriceModel } = require("../models/PriceList")

const priceController = {

    create: async (req, res) => {

        try {
            const price = {
                userType: req.body.userType,
                priceWIva: req.body.priceWIva,
                priceWoIva: req.body.priceWoIva,
            }

            const response = await PriceModel.create(price);

            res.status(200).json({ response, msg: "successfully created price" })


        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {

            const price = await PriceModel.find();
            res.json(price);

        } catch (error) {
            console.log(error);
        }
    },

    get: async (req, res) => {
        try {

            const id = req.params.id;
            const price = await PriceModel.findById(id);

            if (!price) {
                res.status(404).json({ msg: "price not found" });
                return;
            }

            res.json(price);

        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const price = await PriceModel.findById(id);

            if (!price) {
                res.status(404).json({ msg: "price not found" });
                return;
            }

            const deletedPrice = await PriceModel.findByIdAndDelete(id);

            res.status(200).json({ deletedPrice, msg: "Price deleted!" })


        } catch (error) {
            console.log(error);

        }
    },

    update: async (req, res) => {
        

            const id = req.params.id;

            const updatedPrice = {
                userType: req.body.userType,
                priceWIva: req.body.priceWIva,
                priceWoIva: req.body.priceWoIva,
            };
            
            try {
             await PriceModel.findByIdAndUpdate(id, updatedPrice);

            if (!updatedPrice) {
                res.status(404).json({ msg: "Price not found" });
                return;
            }
            res.status(200).json({ updatedPrice, msg: "Price Updated" })

        } catch (error) {
            console.log(error);
        }
    },

}

module.exports = priceController;