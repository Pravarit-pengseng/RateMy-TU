const Product = require('../models/Product')
exports.read = async(req,res)=>{
    try{
        const id =req.params.id
        const producted = await Product.findOne({_id:id}).exec();
        res.send(producted  )
    } catch(err){
        console.log(err)
        res.status(500).send("server Error")
    }
}
    
exports.list = async(req,res)=>{
    try{
        const producted = await Product.find({}).exec();
        res.send(producted)
    } catch(err){
        console.log(err)
        res.status(500).send("server Error")
    }
}
exports.create = async(req,res)=>{
    try{
        console.log(req.body)
        const producted = await Product(req.body).save()
        res.send(producted)
    } catch(err){
        console.log(err)
        res.status(500).send("server Error")
    }
}
exports.update = async(req,res)=>{
    try{
        const id =req.params.id
        const update = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
        .exec()
        res.send(update)
    } catch(err){
        console.log(err)
        res.status(500).send("server Error")
    }
}
exports.remove = async(req,res)=>{
    try{
        const id = req.params.id
        const removed =await Product.findOneAndDelete({_id:id}).exec()
        res.send(removed)
    } catch(err){
        console.log(err)
        res.status(500).send("server Error")
    }
}