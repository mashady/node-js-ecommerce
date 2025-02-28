import Cart from "../../database/models/cart.model.js"

// testing cart schema 

export const addCart=async(req,res)=>{
const cart=await Cart.create(req.body)

res.status(200).json({message: "done", data: cart})

}

export const getCarts = async (req, res) => {
    const allCarts = await Cart.find({});
    res.status(200).json({message: "done", data: allCarts})
}