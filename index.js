const express = require('express')
const mongoose = require('mongoose')
const app = express()


require('dotenv').config()

app.use(express.json())


const PORT = process.env.PORT || 6000

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose.connection.on('connected',()=> console.log('connected'))



app.use('/author',require('./routes/author'))
app.use('/book',require('./routes/book'))
app.get('/',(req,res)=>{

    res.send('API LIVE')
})


app.listen(PORT,()=> console.log("WOrking"))


