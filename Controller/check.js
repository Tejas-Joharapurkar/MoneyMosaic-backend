
export const check = (req, res) => {
    const token = req.cookies;
    // JWT.verify(token,process.env.JWT_SECRET)
    if (token) {
        res.status(201).send('authenticated')
    } else {
        res.status(201).send('notAuthenticated')
    }
}