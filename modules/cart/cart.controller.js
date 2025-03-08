import cartModel from "../../database/models/cart.model.js"
import { productModel } from "../../database/models/product.model.js"
import mongoose from "mongoose"
import { promocodeModel } from "../../database/models/promocode.model.js"


export const addToCart = async (req, res) => {
    try {
        const userId= req.user._id;
        const productID=req.params.productID
        const quantity =req.body.quantity
        const promoCodeName = req.body.promocode;

        if (!mongoose.Types.ObjectId.isValid(userId)){
             return res.status(400).json({message:" Invalid user ID"})
        }

        if (!mongoose.Types.ObjectId.isValid(productID)){
            return res.status(400).json({message:" Invalid product ID"})
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be a positive integer" });
        }
        const addedproduct =await productModel.findById(productID);

        if(!addedproduct){
            return res.status(404).json({message:"product not found"})
        }

        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = new cartModel({ userId, products: [], subtotal: 0 });
        }

        let discountValue = 1
        if (promoCodeName) {
            const promoCode = await promocodeModel.findOne({ name: promoCodeName });
            console.log(promoCode)
            if (promoCode) {
                discountValue = 1-promoCode.value;
            }
        }
        const existingProductIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productID );

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += quantity;
            cart.products[existingProductIndex].totalprice = 
            cart.products[existingProductIndex].quantity * addedproduct.price;
         }else {
            const product={
            productId:addedproduct._id,
            name:addedproduct.name,
            quantity,
            price:addedproduct.price,
            image:addedproduct.image,
            description:addedproduct.description,
            totalprice: quantity * addedproduct.price,
            }
            cart.products.push(product);
            }
            const subtotal = cart.products.reduce((total, product) => total + product.totalprice, 0);
            cart.subtotal = parseFloat((subtotal * discountValue).toFixed(2));
            await cart.save();
            res.status(200).json({message: "Product added to cart successfully!", data: cart,beforeDiscount:subtotal});
        }
         catch(error){
        console.log("error adding to cart",error),
        res.status(500).json({ message: "Internal Server Error", error});
        }

    }

export const reduceCartItemQuantity = async (req, res) => {

        try {
            const userId = req.user._id;
            const productID = req.params.productID;
            const quantity = req.body.quantity;
            const promoCodeName = req.body.promocode;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
    
            if (!mongoose.Types.ObjectId.isValid(productID)) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
    
            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({ message: "Quantity must be a positive integer" });
            }
    
            let cart = await cartModel.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            let discountValue = 1
            if (promoCodeName) {
                const promoCode = await promocodeModel.findOne({ name: promoCodeName });
                console.log(promoCode)
                if (promoCode) {
                    discountValue = 1-promoCode.value;
            
                }
            }

            const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productID);
            if (existingProductIndex === -1) {
                return res.status(404).json({ message: "Product not found in cart" });
            }
    
            if (cart.products[existingProductIndex].quantity > quantity) {
                cart.products[existingProductIndex].quantity -= quantity;
                cart.products[existingProductIndex].totalprice = cart.products[existingProductIndex].quantity * cart.products[existingProductIndex].price;
            } else {
                cart.products.splice(existingProductIndex, 1); 
            }
    
            const subtotal = cart.products.reduce((total, product) => total + product.totalprice, 0);
            cart.subtotal = parseFloat((subtotal * discountValue).toFixed(2));
            await cart.save();
            res.status(200).json({message: "Product added to cart successfully!", data: cart,beforeDiscount:subtotal});
    
        } catch (error) {
            console.log("Error reducing cart quantity", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    };
    
export const deleteFromCart = async (req, res) => {
    try {

        const userId= req.user._id;
        const productID=req.params.productID
        // make sure the request  type ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({message:" Invalid user ID"})
            
        }
        if (!mongoose.Types.ObjectId.isValid(productID)){
            return res.status(400).json({message:" Invalid product ID"})
            
        }
        const cart = await cartModel.findOne({userId});
        const deletedproduct = cart.products.findIndex((product)=>product.productId.toString()===productID)
        console.log(deletedproduct)

        if (deletedproduct < 0){
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

export const getUserCart=async (req,res)=>{
    try {
        
        const userId =req.user._id;
        const cart = await cartModel.findOne({ userId })
        if (!cart) {
            return res.status(404).json({ message: "cart not found" });
        };

        res.status(200).json(cart);

    } catch (error) {
        console.log("error getUser cart",error),
        res.status(500).json({ message: "Internal Server Error", error});}

    }




