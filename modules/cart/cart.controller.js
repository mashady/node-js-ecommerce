import cartModel from "../../database/models/cart.model.js"
import { productModel } from "../../database/models/product.model.js"
import mongoose from "mongoose"

//add product to cart
export const addToCart = async (req, res) => {
    try {

    const userId=req.body.id;
    const productID=req.params.productID
    const quantity =req.body.quantity;
// make sure the request  type ObjectId
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
// if product already exist increase quantity
    const existingProductIndex = cart.products.findIndex(
    (product) => product.productId.toString() === productID );
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
        res.status(200).json({message: "Product added to cart successfully!", data: cart});
    }
     catch(error){
        console.log("error adding to cart",error),
        res.status(500).json({ message: "Internal Server Error", error});
        }}




//delete product from cart
export const deleteFromCart = async (req, res) => {
    try {

        const userId=req.body.id;
        const productID=req.params.productID
        // make sure the request  type ObjectId

        if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message:" Invalid user ID"})
            
        }
        if(!mongoose.Types.ObjectId.isValid(productID)){
        return res.status(400).json({message:" Invalid product ID"})
            
        }
        const cart = await cartModel.findOne({userId});
        const deletedproduct = cart.products.findIndex((product)=>product.productId.toString()===productID)
        console.log(deletedproduct)

        if(deletedproduct < 0){
            return res.status(404).json({message:"product not found"})
        }

        cart.products.splice(deletedproduct,1);
        await cart.save();
        res.status(200).json({message: "Product deleted from cart successfully!", data: cart})
    }

    catch(error){
    console.log("error deleting from cart",error),
    res.status(500).json({ message: "Internal Server Error", error});
    }
}




