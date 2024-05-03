import mongoose from "mongoose";
// import validator from "validator";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    image: {
        public_id: String,
        url: String
    },
    category: {
        type: String,
        enum: ["Press", "Law", "Policies", "Education","Agriculture","Opinions","Scheme","Tech","Event","Sport","Business"],
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    autherName: {
        type: String,
        default: ""
    }
}, { timestamps: true })

export const News = mongoose.model('News', newsSchema)
