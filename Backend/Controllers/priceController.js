const { Price: PriceModel , Price} = require("../models/Price");

const priceController = {

    create: async (req, res) => {

        try {

            if (req.body.userType == null || req.body.priceWIva == null || req.body.priceWoIva == null) {
                return res.status(422).json({ msg: "UserType and priceWIva also priceWoIva is required" });
            } else {
                const priceExists = await Price.findOne({ price: Price })
                console.log(priceExists)

                //check if price exists
                if (priceExists) {
                    return res.status(422).json({ msg: 'Price alredy exists' })
                }

            }

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
            res.status(500).json({ msg: "Internal Server Error" })
        }
    },

    update: async (req, res) => {

        try {
            const id = req.params.id;

            if (req.body.userType == null || req.body.priceWIva == null || req.body.priceWoIva == null) {
                return res.status(422).json({ msg: "userType and priceWIva also priceWoIva is required" });
            }

            const price = {
                userType: req.body.userType,
                priceWIva: req.body.priceWIva,
                priceWoIva: req.body.priceWoIva,
            }

            const priceUpdated = await PriceModel.findByIdAndUpdate(id, price, { new: true })

            console.log("price for update: " + priceUpdated);

            if (!priceUpdated) {
                res.status(404).json({ msg: "Price not found" });
                return;
            }

            console.log("price updated: " + priceUpdated)
            res.status(200).json({ priceUpdated, msg: "Price Updated" })

        } catch (error) {
            res.status(500).json({ msg: "Internal Server Error" })
        }
    },

}

module.exports = priceController;