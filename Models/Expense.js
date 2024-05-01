import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    month: {
        type: String,
        required: true
    }, // You might want to store the month as a string or a date
    budget: {
        type: Number,
        default: 0
    }, // Monthly budget for expenses
    currentbudget: {
        type: Number,
        default: 0
    }, // Monthly budget for expenses
    expenses: [
        {
            category: { type: String, required: true },
            amount: { type: Number, required: true },
            currentamount: { type: Number, required: true },
            _id: String
        },
    ],
    spendings: [{ day: { type: Number }, totalspend: { type: Number } }]
});

export default mongoose.model("Expense", ExpenseSchema)