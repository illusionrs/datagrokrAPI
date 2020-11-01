const mongoose = require('mongoose')


const BookSchema = new mongoose.Schema({

    authorname:{
        type:String,
        required:true
    },
    bookname:{
       type:String,
       required:true,
       unique:true  
    }
})

module.exports = mongoose.model('book',BookSchema);