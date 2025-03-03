import cartModel from "../../database/models/cart.model.js"
import { productModel } from "../../database/models/product.model.js"
import mongoose from "mongoose"
// testing cart schema 

export const addCart=async(req,res)=>{
const cart=await cartModel.create(req.body)

res.status(200).json({message: "done", data: cart})

}

export const getCarts = async (req, res) => {
    const allCarts = await cartModel.find({});
    res.status(200).json({message: "done", data: allCarts})
}

export const addToCart = async (req, res) => {
    try {

const userId=req.body.id;
const productID=req.params.productID
const quantity =req.body.quantity;

if(!mongoose.Types.ObjectId.isValid(userId)){
return res.status(400).json({message:" Invalid user ID"})

}
if(!mongoose.Types.ObjectId.isValid(productID)){
return res.status(400).json({message:" Invalid product ID"})

}
 const addedproduct =await productModel.findById(productID);
 if(!addedproduct){

    return res.status(404).json({message:"product not found"})


 }
 let cart = await cartModel.findOne({userId});
if(!cart){

cart= new cartModel({userId,products:[]});

}


const existingProductIndex = cart.products.findIndex(
    (product) => product.productId.toString() === productID
  );
  console.log(existingProductIndex);
if (existingProductIndex > -1) {
    cart.products[existingProductIndex].quantity += quantity;

}else{


 let product={
 productId:addedproduct._id,
 name:addedproduct.name,
 quantity,
 price:addedproduct.price,
 image:addedproduct.image,
 description:addedproduct.description
}
 cart.products.push(product);
}

 await cart.save();

 res.status(200).json({message: "added to cart sucessfully", data: cart});}
catch(error){


    console.log("error adding to cart",error),
    res.status(500).json({ message: "Internal Server Error", error});

}}



export const deleteFromCart = async (req, res) => {
const productID=req.params.id;
 const cart = await cartModel.findOne({ userId:req.body.id});
 const deletedproduct = cart.products.findIndex((product)=>product.productId===productID)

 cart.products.splice(deletedproduct,1);


 await cart.save();

 res.status(200).json({message: "done", data: cart});
}




