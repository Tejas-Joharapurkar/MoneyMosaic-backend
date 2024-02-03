import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    month: {
        type: String,
        required: true
    }, // You might want to store the month as a string or a date
    transactions: [
        {
            category: { type: String, required: true },
            amount: { type: Number, required: true },
            desc: { type: String, required: true },
            date: { type: Date, default: Date.now },
        },
    ],
});

export default mongoose.model("Transaction", TransactionSchema)