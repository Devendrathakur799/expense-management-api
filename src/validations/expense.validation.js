
const mongoose = require("mongoose");

const validateCreateExpense = (req, res, next) => {
    const {
        userId,
        title,
        amount,
        category
    } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "userId is required"
        });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid userId"
        });
    }

    if (!title || !title.trim()) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    if (amount === undefined || amount === null || amount === "") {
        return res.status(400).json({
            success: false,
            message: "Amount is required"
        });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Amount must be greater than 0"
        });
    }

    if (!category || !category.trim()) {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    next();
};

const validateUpdateExpense = (req, res, next) => {
    const { title, amount, category } = req.body;

    if (
        title === undefined &&
        amount === undefined &&
        category === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: "At least one field is required for update"
        });
    }

    if (amount !== undefined) {
        if (isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be greater than 0"
            });
        }
    }

    if (title !== undefined && !title.trim()) {
        return res.status(400).json({
            success: false,
            message: "Title cannot be empty"
        });
    }

    if (category !== undefined && !category.trim()) {
        return res.status(400).json({
            success: false,
            message: "Category cannot be empty"
        });
    }

    next();
};

module.exports = {
    validateCreateExpense,
    validateUpdateExpense
};