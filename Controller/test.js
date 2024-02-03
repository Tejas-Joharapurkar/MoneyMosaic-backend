import User from "../Models/User.js"

export const Adduser = async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await User.findOne({ name })
        console.log(req.body);
        if (user) {
            const isPasswordCorrect = await user.ComparePassword(password)
            if (isPasswordCorrect) {
                res.status(201).json(user)
                console.log(user);
            } else {
                res.status(401).json({ msg: "password not matched" })
            }
        } else {
            const user = await User.create({ ...req.body })
            res.status(201).json(user)
        }
    } catch (error) {
        res.status(401).json({ error })
    }
}
export default Adduser