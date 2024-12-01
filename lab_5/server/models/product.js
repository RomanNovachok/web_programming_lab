const {model, Schema} =  require('mongoose');

const ProductsSchema = new Schema({
    imageLink: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    priceInGrn: {type: Number, required: true},
}, {timestamps: true});

module.exports = model('Products', ProductsSchema);
