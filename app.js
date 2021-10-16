const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Auth Liabrary',
            version: '1.0.0'
        }
    },
    apis:['*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

const {route} = require('./routes')
const bodyParser = require('body-parser')
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/api/v1',route)

app.use('/', (req, res) => {
    res.send('Welcome NodeJs Learning...')
    res.end()
})
app.listen(5000, () => {
    console.log('Server Started ')
})