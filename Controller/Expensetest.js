import Expense from "../Models/Expense.js"
import Transaction from "../Models/Transaction.js";
export const Createxpense = async (req, res) => {
    try {
        const { userId } = req.params
        console.log(typeof (userId));
        req.body.user = userId
        const newexpense = await Expense.create({ ...req.body })
        res.status(201).json({ newexpense })
    } catch (error) {
        res.status(401).json({ error })
    }
}

export const Getexpense = async (req, res) => {
    console.log("getExpense called");
    const { userId, month } = req.params
    const transaction = await Transaction.findOne({ user: userId, month }) || []
    try {
        const expense = await Expense.findOne({ user: userId, month })
        if (expense) {
            res.status(201).json({ expense, transaction: transaction.transactions });
        } else {
            res.status(404).json({ mag: 'not found' })
        }
        console.log("getExpense successful");
    } catch (error) {
        console.log("getExpense failed");
        res.status(404).json({ error: 'somthing went wrong in Getexpense controller' })

    }
}
//* add expense in exisitng expense array (params : expense id, body : category,amount)

export const Addexpense = async (req, res) => {
    try {
        console.log("called Addexpense");
        const { userId, month } = req.params;
        const { category, amount, desc, date } = req.body
        const current_expenses = await Expense.findOne({ user: userId, month })
        const updatecategory = current_expenses.expenses.find(expense => expense.category === category)
        if (updatecategory) {
            updatecategory.currentamount -= amount
            current_expenses.currentbudget -= amount
            updatecategory.date = new Date().getTime()
            const transaction_history = await Transaction.findOne({ user: userId, month })
            if (transaction_history) {
                transaction_history.transactions.push({ category, amount, desc })
                await transaction_history.save()
                await current_expenses.save();
                res.status(201).json({ current_expenses, transaction_history, msg: "expenditure added successfully" })
            } else {
                const newtransaction = { user: userId, month, transactions: [{ category, amount, desc }] }
                const transaction = await Transaction.create(newtransaction)
                await current_expenses.save();
                res.status(201).json({ current_expenses, transaction, msg: "expenditure added successfully" })
            }
            console.log("successfuly executed Addexpense");
        } else {
            console.log("failed addexpense");
            res.status(404).json({ msg: "category does not exist" })
        }
    } catch (error) {
        res.status(404).json({ mag: 'not found' })
    }
}


export const UpddateExpense = async (req, res) => {
    try {
        const { expenseId } = req.params
        const current_expense = await Expense.findById(expenseId);
        current_expense.expenses.map((each) => {
            if (each.category === req.body.category) {
                return { ...each, amount: req.body.amount, date: new Date().getTime() }
            } else {
                return each
            }
        })
        await current_expense.save()
        res.status(201).json({ current_expense })
    } catch (error) {
        res.status(400).json({ error })
    }
}
export default { Createxpense, Addexpense, UpddateExpense, Getexpense }