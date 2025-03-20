import cartModel from "../../database/models/cart.model.js";
import { productModel } from "../../database/models/product.model.js";
import mongoose from "mongoose";
import { promocodeModel } from "../../database/models/promocode.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productID = req.params.productID;
    const quantity = parseInt(req.body.quantity, 10);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }

    const addedProduct = await productModel.findById(productID);
    if (!addedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({ userId, products: [], subtotal: 0 });
    }

    const productDiscount = addedProduct.discount || 0;
    const discountMultiplier = 1 - productDiscount;

    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productID
    );
    if (existingProductIndex > -1) {
      cart.products[existingProductIndex].quantity += quantity;
      cart.products[existingProductIndex].totalPriceBeforeDiscount =
        cart.products[existingProductIndex].quantity * addedProduct.price;
      cart.products[existingProductIndex].totalprice =
        cart.products[existingProductIndex].totalPriceBeforeDiscount *
        discountMultiplier;
    } else {
      cart.products.push({
        productId: addedProduct._id,
        name: addedProduct.name,
        quantity,
        price: addedProduct.price,
        image: addedProduct.images[0],
        description: addedProduct.description,
        totalPriceBeforeDiscount: quantity * addedProduct.price,
        totalprice: quantity * addedProduct.price * discountMultiplier,
      });
    }

    const subtotalBeforeDiscount = cart.products.reduce(
      (total, product) => total + product.totalPriceBeforeDiscount,
      0
    );

    const subtotalAfterProductDiscount = cart.products.reduce(
      (total, product) => total + product.totalprice,
      0
    );

    let finalSubtotal = subtotalAfterProductDiscount;
    cart.counter = cart.products.reduce((total, product) => total + product.quantity, 0);
    cart.subtotal = parseFloat(finalSubtotal.toFixed(2));
    cart.subtotalBeforeDiscount = parseFloat(finalSubtotal.toFixed(2));

    const discountPercentage = parseFloat(cart.discountPercentage) / 100;
    const promoDiscountAmount = cart.subtotal * discountPercentage;
    cart.subtotal -= promoDiscountAmount;
    await cart.save();

    res.status(200).json({
      message: "Product added to cart successfully!",
      data: cart,
      beforeDiscount: subtotalBeforeDiscount,
      afterProductDiscount: subtotalAfterProductDiscount,
      afterPromoDiscount: finalSubtotal,
      discountApplied: `${(discountPercentage * 100).toFixed(2)}%`,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


export const reduceCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const productID = req.params.productID;
    const quantity = parseInt(req.body.quantity, 10);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }

    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingProductIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productID
    );
    if (existingProductIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const productInCart = cart.products[existingProductIndex];
    const addedProduct = await productModel.findById(productID);

    const productDiscount = addedProduct.discount || 0;
    const discountMultiplier = 1 - productDiscount;

    if (productInCart.quantity > quantity) {
      productInCart.quantity -= quantity;
      productInCart.totalPriceBeforeDiscount =
        productInCart.quantity * productInCart.price;
      productInCart.totalprice =
        productInCart.totalPriceBeforeDiscount * discountMultiplier;
    } else {
      cart.products.splice(existingProductIndex, 1);
    }

    if (cart.products.length === 0) {
      await cartModel.deleteOne({ userId });
      return res
        .status(200)
        .json({
          message: "Cart is now empty and has been deleted.",
          data: cart,
        });
    }
    const subtotalBeforeDiscount = cart.products.reduce(
      (total, product) => total + product.totalPriceBeforeDiscount,
      0
    );
    const subtotalAfterProductDiscount = cart.products.reduce(
      (total, product) => total + product.totalprice,
      0
    );

    let finalSubtotal = subtotalAfterProductDiscount;
    cart.counter = cart.products.reduce((total, product) => total + product.quantity, 0);
    cart.subtotal = parseFloat(finalSubtotal.toFixed(2));
    cart.subtotalBeforeDiscount=parseFloat(finalSubtotal.toFixed(2));
    const discountPercentage = parseFloat(cart.discountPercentage) / 100;
    const promoDiscountAmount = cart.subtotal * discountPercentage;
    cart.subtotal -= promoDiscountAmount;


    await cart.save();

    res.status(200).json({
      message: "Product quantity reduced successfully!",
      data: cart,
      beforeDiscount: subtotalBeforeDiscount,
      afterProductDiscount: subtotalAfterProductDiscount,
      afterPromoDiscount: finalSubtotal,
      discountApplied: `${(discountPercentage * 100).toFixed(2)}%`,
    });
  } catch (error) {
    console.error("Error reducing cart quantity:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productID = req.params.productID;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: " Invalid user ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return res.status(400).json({ message: " Invalid product ID" });
    }
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const deletedproduct = cart.products.findIndex(
      (product) => product.productId.toString() === productID
    );

    if (deletedproduct === -1) {
      return res.status(404).json({ message: "product not found" });
    }

    cart.products.splice(deletedproduct, 1);
    const subtotalAfterRemoval = cart.products.reduce(
      (total, product) => total + product.totalprice,
      0
    );
    cart.subtotal = parseFloat(subtotalAfterRemoval.toFixed(2));
    cart.subtotalBeforeDiscount = parseFloat(subtotalAfterRemoval.toFixed(2));
    const discountPercentage = parseFloat(cart.discountPercentage) / 100;
    const promoDiscountAmount = cart.subtotal * discountPercentage;
    cart.subtotal -= promoDiscountAmount;

    if (cart.products.length === 0) {
      await cartModel.deleteOne({ userId });
      return res
        .status(200)
        .json({
          message: "Cart is now empty and has been deleted.",
          data: cart,
        });
    }
    cart.counter = cart.products.reduce((total, product) => total + product.quantity, 0);

    await cart.save();
    return res
      .status(200)
      .json({ message: "product has been deleted from cart.", data: cart });
  } catch (error) {
    console.log("error deleting from cart", error),
      res.status(500).json({ message: "Internal Server Error", error });
  }
};


  export const deleteCart = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: " Invalid user ID" });
    }
   
    const cart = await cartModel.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

      return res
        .status(200)
        .json({
          message: "Cart is now empty and has been deleted.",
          data: cart,
        });

  } catch (error) {
    console.log("error deleting from cart", error),
      res.status(500).json({ message: "Internal Server Error", error });
  }
};




export const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log("error getUser cart", error),
      res.status(500).json({ message: "Internal Server Error", error });
  }
};


  export const addPromoCode = async (req, res) => {
    try {
      const userId = req.user._id;
      const cart = await cartModel.findOne({ userId });
      const promoCodeName = req.body.promocode?.trim();

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      if (!promoCodeName) {
        return res.status(400).json({ message: "Promo code is required" });
      }

      const promoCode = await promocodeModel.findOne({ name: promoCodeName });

      if (!promoCode) {
        return res.status(400).json({ message: "Invalid promo code" });
      }
      if (cart.PromoCodeApplied.includes(promoCode.name)) {
        return res.status(400).json({ message: "you applied this code before" });
      }
      cart.PromoCodeApplied.push(promoCode.name);
      const promoDiscountAmount = cart.subtotal * promoCode.value; 
      cart.subtotal -= promoDiscountAmount;
      cart.discountPercentage += (promoCode.value* 100)
      await cart.save(); 

      res.status(200).json({ message: "Promo code applied successfully", cart });

    } catch (error) {
      console.error("Error applying promo code:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };
