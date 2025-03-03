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
    totalprice:{
        type:Number,
        default: function(){
            return this.quantity * this.price
        }
    }

    }],
    subtotal:{
        type:Number,
        default:0,
    },
    status:{
        type:String,
        enum:["active","completed"],
        default:'completed',

    },
    paymentMethod:{
    type:String,
    enum:["Epay","Cash"],
    default:"Cash",
    }, 
},
{timestamps:true})

// middleware function calculate subtotal   
cartSchema.pre("save",function(next){

this.subtotal=this.products.reduce((sum,product)=>sum+product.totalprice,0)
next();

})
const cartModel=mongoose.model('Cart',cartSchema)
export default cartModel