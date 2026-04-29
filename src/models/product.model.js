import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Foods", "Electronics", "Clothes", "Beauty Products", "Others"],
      required: [true, "Product type is required"],
    },
    quantityStock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
    mrp: {
      type: Number,
      required: [true, "MRP is required"],
      min: [0, "MRP cannot be negative"],
    },
    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: [0, "Selling price cannot be negative"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    isEligibleForReturn: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Published", "Unpublished"],
      default: "Unpublished",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
