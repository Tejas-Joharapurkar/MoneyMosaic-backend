import User from "../Models/User.js"
export const register = async (req, res, next) => {
    console.log(req.body);
    try {
        console.log(1);
        const NewUSer = await User.create({ ...req.body })
        const { _id, username } = NewUSer
        console.log(2);
        const token = NewUSer.CreateJWT()
        console.log(3);
        res.cookie('JWT', token, {
            expires: new Date(Date.now() + 2589200000),
            httpOnly: true
        }).json({ _id, username })
        console.log(4);
    } catch (error) {
        res.status(401).send(error.message)
    }
}

export const login = async (req, res, next) => {
    console.log("hited");
    console.log(req.body);
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(401).send("please provide email and password")
            console.log("please provide email and password");
        } else {
            const user = await User.findOne({ username })
            if (!user) {
                res.status(401).send("inalid email User not Found")
                console.log("inalid email User not Found");
            } else {
                const isPasswordCorrect = await user.ComparePassword(password)
                if (isPasswordCorrect) {
                    const { _id, username, balance, spend } = user
                    const token = await user.CreateJWT()
                    // console.log(...others);
                    res.cookie('JWT', token, {
                        expires: new Date(Date.now() + 2589200000),
                        httpOnly: true
                    }).json({ _id, username, balance, spend })
                } else {
                    res.status(401).send("password Incorrect")
                }
            }
        }
    } catch (error) {
        res.status(401).send("error")

        // next(error)
    }
}

export default { register, login }