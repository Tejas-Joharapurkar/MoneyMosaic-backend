import express from "express";
import { Createxpense, Addexpense, UpddateExpense, Getexpense } from "../Controller/Expensetest.js"
const router = express.Router()

router.route('/create/:userId').post(Createxpense)
router.route('/add/:userId/:month').patch(Addexpense)
router.route('/get/:userId/:month').get(Getexpense)
export default router