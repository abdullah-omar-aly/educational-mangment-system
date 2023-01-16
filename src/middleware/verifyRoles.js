function verifyRoles (...allowedRoles)  {
    return (req, res , next ) => {
        if (!req?.userRoles) return res.sendStatus(401)
        const result = isAllowedUser(allowedRoles , req.userRoles)
        if (!result) return res.sendStatus(401)
        next()
    }
}

export function isAllowedUser(allowedRoles , userRoles) {
    const  result = userRoles.map(role => allowedRoles.includes(role)).find(val => val === true)

    if (!result) return false
    return true
}

export default verifyRoles