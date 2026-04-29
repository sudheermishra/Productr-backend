import Product from "../models/product.model.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && (status === "Published" || status === "Unpublished")) {
      filter.status = status;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, type, quantityStock, mrp, sellingPrice, brand, images, isEligibleForReturn, status } = req.body;

    if (!name || !type || quantityStock === undefined || !mrp || !sellingPrice || !brand) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    const product = await Product.create({
      name,
      type,
      quantityStock,
      mrp,
      sellingPrice,
      brand,
      images: images || [],
      isEligibleForReturn: isEligibleForReturn || false,
      status: status || "Unpublished",
    });

    res.status(201).json({ success: true, message: "Product created successfully", product });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
