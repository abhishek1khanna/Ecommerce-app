import mongoose from "mongoose";

const createCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model('category', createCategorySchema);
