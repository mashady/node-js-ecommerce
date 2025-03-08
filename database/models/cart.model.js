import mongoose from "mongoose"
const cartSchema=new mongoose.Schema({

    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },

    products: [
     {
        productId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true

     },

    name:String,
    price:Number,
    image:String,
    description:String,
    quantity:{
        type:Number,
        default:1,
        min:1,
    },
    totalprice: {
        type: Number,
        default: 0, 
    },
    },],
    subtotal:{
        type:Number,
        default:0,
    }
},
{timestamps:true})

const cartModel=mongoose.model('Cart',cartSchema)
export default cartModel