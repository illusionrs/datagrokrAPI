const mongoose = require('mongoose')
const Book = require('../models/book')
const Author = require('../models/author')

const router = require('express').Router()

router.post('/',async (req,res)=>{


    try{

    const {bookname,authorname}= req.body

    if(!bookname || !authorname)
    return res.status(400).json({msg:"All fields Required"})

    const check =await Book.findOne({bookname:bookname})

    if(check)
    return res.status(400).json({msg:"ALready exist"})

    const BookSchema = new Book({
        bookname,
        authorname
    })
    BookSchema.save()

    const checkAuthor = await Author.findOne({authorname:authorname})
   

    
    
    if(checkAuthor){
        const tempbook=checkAuthor.bookname
        tempbook.push(bookname)
        checkAuthor.overwrite({bookname:tempbook,authorname:authorname})
        checkAuthor.save()
    }
    else{
        const tempbook = [bookname]
       const authortemp = new Author({
           bookname:tempbook,
           authorname:authorname
       })
       authortemp.save()
    }

    res.json({
        msg:"Done"
    })
}
 catch(err){
     res.json({error:err})
 }

 
})

router.get('/:bookname',async (req,res)=>{

      const bookname = req.params.bookname

      const finddata = await Book.findOne({bookname:bookname})

      if(finddata)
      return res.status(200).json({
          data:finddata
      })

      res.status(200).json({
          msg:"Not Found Book with this name"
      })
})

router.get('/',async (req,res)=>{

    const data = await Book.find({})

    res.status(200).json({
        data:data
    })
})

router.put('/',async (req,res)=>{
    
    try{

    
    const {bookname,authorname,newbookname}= req.body

    if(!bookname || !newbookname || !authorname)
    return res.status(400).json({msg:"All fields required"})
    
    const check = await Book.findOne({bookname:bookname})

    if(check)
    {
        check.overwrite({bookname:newbookname,authorname:authorname})
        check.save()

        res.status(200).json({ msg:"Done "})
    }

    res.status(400).json({msg:"Not Found with this Bookname"})
}
catch(err){
    res.status(400).json({
        err:err
    })
}

})

module.exports=router