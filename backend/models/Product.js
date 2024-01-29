const { Schema, model } = require('mongoose')

const Product = new Schema({
    header: {
        type: String,
        require: true
    },
    price: {
        type: Number,
         
    },
    image: {
        type: String,
    }
})

module.exports = model('Product', Product)