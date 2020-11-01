const mongoose = require('mongoose')
const router = require('express').Router()
const Author = require('../models/author')
router.post('/',async (req,res)=>{

    const {authorname,bookname}=req.body

    if(!authorname || !bookname)
    return res.status(400).json({msg:"All fields Required"})


     const check = await Author.findOne({authorname:authorname})

     if(check)
     return res.status(400).json({msg:"Already Exists"})
     const savedata = new Author({
         authorname,
         bookname:bookname
     })

     savedata.save()
     res.json({
         msg:"Saved"
     })
})


router.get('/',async (req,res)=>{

    const a =await Author.find({})

    res.json({
        data:a
    })
})


module.exports = router