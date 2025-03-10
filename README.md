# Online-store

![erd](https://github.com/mashady/node-js-ecommerce/blob/master/erd.png)

## Overview

This document outlines the features and functionality for the Online-store. The platform allows customers to shop for products from various sellers, manage their orders, and process payments securely. The admin panel offers a comprehensive interface to manage users, products, orders, and promotions. Sellers (vendors) can manage their own product listings and order processing.

## Features

### ✅ User Management

The platform provides robust user management to enhance the shopping experience for customers and streamline the management for admins.

- **User Registration & Login**

  - Users can register and log in using multiple methods:
    - Email
    - Phone Number
    - Social Media (e.g., Google)
  - Confirmation emails are sent after registration for account verification.

- **Profile Management**

  - Users can manage personal information, such as:
    - Name
    - Address

- **User Roles**

  - Multi-user roles to define access levels:
    - **Customer**: Shop products, place orders, manage profile.
    - **Seller**: List products, manage inventory, process orders.
    - **Admin**: Manage all users, products, orders, and promotions.

- **Wishlist & Favorites**

  - Customers can save products they wish to purchase later in a wishlist.

- **Order History & Tracking**

  - Customers can view previous orders and track current order statuses.

- **Reviews & Ratings**
  - Customers can leave reviews and rate products they have purchased.

### ✅ Product Management

Product management enables sellers to list their items and manage their stock while customers can explore products with ease.

- **Categories**

  - Products are organized into categories for easy browsing.

- **Product Listings**

  - Sellers can list products with detailed information:
    - Product images
    - Descriptions
    - Prices

- **Stock Availability**

  - Sellers can update the availability status of products.

- **Product Search & Filters**
  - Customers can search products by name and filter results by:
    - Price range
    - Category
    - Other customizable filters

### ✅ Shopping Cart & Checkout

The shopping cart and checkout process are designed to be user-friendly and efficient.

- **Cart Management**

  - Customers can add or remove items from their shopping cart.
  - Customers can adjust the quantity of items.

- **Order Summary**

  - A summary of the order is provided, including:
    - Item details
    - Price breakdown (taxes, shipping, etc.)

- **Payment Methods**

  - Multiple secure payment methods are available, including:
    - Credit Card
    - Stripe
    - Cash on Delivery

- **Promo Codes & Discounts**
  - Customers can apply promo codes and discounts during checkout.

### ✅ Order Management

Order management is crucial for processing and tracking customer orders efficiently.

- **Order Placement & Confirmation**

  - Customers can place orders, which are confirmed via email.

- **Order Tracking**
  - Customers can track the status of their orders (e.g., Pending, Shipped, Delivered).
- **Email Notifications**
  - Order updates and notifications (e.g., order shipped, order delivered) are sent via email.

### ✅ Payment Integration

Secure payment gateways ensure safe and seamless transactions.

- **Payment Gateway Integration**
  - Integration with popular payment gateways such as:
    - **Stripe**

### ✅ Admin Panel Features

The admin panel provides an extensive set of tools for managing the platform and ensuring smooth operations.

- **User Management**

  - Admins can approve or restrict users from the platform.

- **Product & Category Management**

  - Admins can add, remove, or modify products and categories.

- **Order & Shipping Management**

  - Admins can view and manage all orders and their statuses.

- **Discount & Promo Code Management**

  - Admins can create, modify, and deactivate discount codes and promotions.

- **Content Management**
  - Admins can manage content for the homepage and banners.

### ✅ Seller (Vendor) Management

Sellers have their own dashboard to manage products and orders.

- **Seller Registration & Profile Setup**

  - Sellers can register on the platform and set up their profile with business details.

- **Product Listing & Inventory Management**

  - Sellers can list new products and update existing products.
  - They can manage stock levels and availability.

- **Order Processing**
  - Sellers can view and update the status of customer orders (e.g., Processing, Shipped, Delivered).

## Installation Instructions

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/mashady/node-js-ecommerce
   cd node-js-ecommerce
   ```

## Documentation

[Documentation](https://store-react-api-2.onrender.com/api-docs)

## Demo

[demo link](https://store-react-api-2.onrender.com/)
