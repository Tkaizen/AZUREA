import express from "express";
import Product from "../models/product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
// @access  Private (or Public depending on requirement, assuming Private based on User Review)
router.get("/", protect, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private
router.post("/", protect, async (req, res) => {
    const { name, category, description, price, unit, image } = req.body;

    if (!name || !category || !price) {
        return res.status(400).json({ message: "Please add all required fields" });
    }

    try {
        const product = await Product.create({
            name,
            category,
            description,
            price,
            unit,
            image
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: "Invalid product data" });
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
router.put("/:id", protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name || product.name;
            product.category = req.body.category || product.category;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.unit = req.body.unit || product.unit;
            product.image = req.body.image || product.image;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("DELETE Error:", error);
        res.status(500).json({ message: "Server Error: " + error.message });
    }
});

export default router;
