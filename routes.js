const express = require('express');
const route = express.Router()
const { users, post } = require('./data');
const { validRequest, authAccess, postAuth } = require('./auth.middleware')

/**
 * @author Ajay Sharma
 * @description This is Get API for All Users -- 
 * 
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Get All Users
 *     consumes:
 *     - application/json
 *     parameters:
 *      - in : body
 *        name: user
 *        description: users get
 *        schema:
 *          type: object
 *          require:
 *            - user
 *            - role
 *          properties:
 *              user:
 *               type: string
 *              role:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 * 
 */
route.post('/users', validRequest, authAccess, (req, res) => {
    const allUsers = users;
    res.status('200').json(allUsers)
})

/**
 * @author Ajay Sharma
 * @description This is Get API for user By Id -- 
 * 
 */

/**
 * @swagger
 * # /api/v1/user; id=3;id=4
 * /api/v1/user/1:
 *   post:
 *     summary: Get user id
 *     consumes:
 *       - application/json
 *     parameters:
 *      - in : body
 *        name: user
 *        description: get user by id
 *        schema:
 *         type: object
 *         require: 
 *           - user
 *           - role
 *         properties:
 *           user: 
 *            type: string
 *           role:
 *            type:  string
 *     responses:
 *       200:
 *         description: Success
 * 
 * 
 */
route.post('/user/:id', validRequest, (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    res.status('200').json(user)
})


/**
 * @author Ajay Sharma
 * @description This is Get API for All Post Data -- 
 * 
 */

/**
 * @swagger
 * /api/v1/post:
 *   post:
 *     summary: Get posts Data
 *     consumes:
 *       - application/json
 *     parameters:
 *      - in : body
 *        name: user
 *        description: get posts
 *        schema:
 *         type: object
 *         require: 
 *           - user
 *           - role
 *           - userId
 *         properties:
 *           user: 
 *            type: string
 *           role:
 *            type:  string
 *           userId:
 *             type: integer
 *     responses:
 *       200:
 *         description: Success
 * 
 * 
 */
route.post('/post', validRequest, (req, res) => {
    const { role: uRole, userId } = req.body
    let allPost;
    if (uRole === 'ADMIN') {
        const postDU = post.map(item => {
            const { name, role } = users.find(u => u.id == item.createdBy)
            return {
                ...item, name, role
            }
        })
        allPost = postDU
    }
    else allPost = post.filter(item => Number(item.createdBy) === userId).map(item => {
        const { name, role } = users.find(u => u.id == item.createdBy)
        return {
            ...item, name, role
        }
    })
    res.status('200').json(allPost)
})

/**
 * @author Ajay Sharma
 * @description This is Get API for Post Data By Id -- 
 * 
 */

/**
 * @swagger
 * # /api/v1/post; id=3;id=4
 * /api/v1/post/1:
 *   post:
 *     summary: Get post id
 *     consumes:
 *       - application/json
 *     parameters:
 *      - in : body
 *        name: user
 *        description: get post by id
 *        schema:
 *         type: object
 *         require: 
 *           - user
 *           - role
 *           - userId
 *         properties:
 *           user: 
 *            type: string
 *           role:
 *            type:  string
 *           userId:
 *             type: integer
 *     responses:
 *       200:
 *         description: Success
 * 
 * 
 */
route.post('/post/:id', validRequest, (req, res) => {
    const id = req.params.id
    const { role, userId } = req.body
    const postD = post.find((item) => item.id === Number(id));
    const isAuth = postAuth(Number(postD.createdBy), role, Number(userId))
    if (!isAuth) return res.status(403).send('You dont have right access')
    res.status('200').json(postD)
})

module.exports.route = route