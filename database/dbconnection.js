import mongoose from "mongoose"

export const myconection= mongoose.connect('mongodb://127.0.0.1:27017/product')
.then(()=>console.log("done"))
.catch(()=>console.log("err"))
