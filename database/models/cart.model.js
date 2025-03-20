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
    totalPriceBeforeDiscount: {
        type: Number,
        default: 0,
      },
    totalprice: {
        type: Number,
        default: 0, 
    },
   
    },],
    counter:{
        type:Number,
        default:0,
      },
      discountPercentage:{
        type:Number,
        default:0,
      },
    subtotalBeforeDiscount:{
        type:Number,
        default:0,
    },
    
      subtotal:{
        type:Number,
        default:0,
       }
    ,PromoCodeApplied:[{
        type: String,

    }]
},
{timestamps:true})

const cartModel=mongoose.model('Cart',cartSchema)
export default cartModel