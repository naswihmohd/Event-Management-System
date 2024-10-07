const express =require ('express')
const adminRouter= require('./router/adminRouter')
const userRouter= require('./router/userRouter')
const eventsRouter= require('./router/eventsRouter')
const dbConnection = require('./config/dbConfig')
const cookie = require('cookie-parser')
require('dotenv').config()

const app = express()
dbConnection()
app.use(cookie())

app.use('/auth',userRouter)
app.use('/events',eventsRouter)
app.use('/admin',adminRouter)



app.listen(4000,()=>{
    console.log('server connected')
})