const mongoose = require('mongoose')

const arraySchema = new mongoose.Schema({ name: String });

const AuthorSchema = new mongoose.Schema({

    authorname:{
        type:String,
        required:true,
        unique:true
    },
    bookname:{
       type:[{
           type:String
       }]
    }
})



module.exports = mongoose.model('author',AuthorSchema);