const jwt = require('jsonwebtoken')

const verifyJWT = (req , res , next) => {
    

    const token = req.cookies.jwt
    if (!token) return res.sendStatus(401)
    // if (!token) return res.redirect('/login')


    jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
        if (err ) {
            console.log('token errror')
            // res.redirect('/login')
            return res.sendStatus(403)
        }
        req.userId = decoded.id 
        req.userRoles = decoded.roles

        next()
    })

}

export default verifyJWT
    

