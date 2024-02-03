import express from "express";
import Adduser from '../Controller/test.js'

const router = express.Router()
router.route('/register').post(Adduser)

export default router