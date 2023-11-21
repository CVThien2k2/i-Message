const authRouter = require('./auth.route')
const groupRouter = require('./group.route') 
function route(app){
    app.use('/auth',authRouter)
    app.use('/group',groupRouter)
}
module.exports = route;