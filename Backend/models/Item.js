const mongoose = require ("mongoose");
const { Schema } = mongoose;


const itemSchema = new Schema({

    itemName: {
        type: String,
        require: true
    },
   
    kcal:{
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
        {timestamps: true} // controla data de criacao e atualizacao

)

const Item = mongoose.model("Item", itemSchema)
module.exports = {
    Item,
    itemSchema,
};

/* 
const { Schema } = mongoose;
 */

/* 

const Item = mongoose.model('Item',{
    itemName: {
        type: String,
        require: true
    },
   
    kcal:{
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

 */
    /* {timestamps: true} // salva a data de criação e atualizacao  */
/* );


module.exports = Item;

 */

