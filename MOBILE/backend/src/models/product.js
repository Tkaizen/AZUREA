// models/product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,

        default: 'Cars'
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,

        default: 'hour'
    },
    image: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});


export default mongoose.models.Product || mongoose.model('Product', productSchema);