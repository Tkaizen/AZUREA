import mongoose from 'mongoose';
import { use } from 'react';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},   {timestamps: true} );

export default mongoose.model('Product', productSchema);