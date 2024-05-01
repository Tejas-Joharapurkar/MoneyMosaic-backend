import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    url: {
        type: String
    },
    balance: {
        type: Number,
    },
    spend: {
        type: Number,
    }
}, { timestamps: true })

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.CreateJWT = function () {
    return jwt.sign({ userId: this.id, }, process.env.JWT_SECRET, { expiresIn: '30d' })
}
UserSchema.methods.ComparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

export default mongoose.model("User", UserSchema)