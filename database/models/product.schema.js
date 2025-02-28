import mongoose from "mongoose";

const productschema=  mongoose.Schema({
    name:{type:String},
    id:{type:Number},
    description:{type:String},
    category:{type:Object},
    subcategory:{type:Object},
    image:{type:String},
    price:{type:Number},
    seller:{type:Number},
    stock:{type:Number},
    variations:{type:Object},
    ratings:{type:Number},
    reviews:{type:Object},

    
})
export const productmodle = mongoose.model("product",productschema)