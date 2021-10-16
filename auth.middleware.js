
const { role, post } = require('./data')
const validRequest = (req, res, next) => {
    const data = req.body
    if (data == null || data.user == null || data.user === 'undefined') {
        res.status(401).send('Not Access')
    }
    next()
}

const authAccess = (req, res, next) => {
    const { role: userRolerole } = req.body;
    if (userRolerole !== 'ADMIN') res.status(403).send('You dont have right access')
    next()

}

const postAuth = (postUId, uRole, uId) => {
    if (uRole === 'ADMIN' || postUId === uId) return true;
    return false
}


module.exports = { validRequest, authAccess, postAuth }