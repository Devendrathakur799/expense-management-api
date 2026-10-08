const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Email already exists"
        });
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");

        return res.status(400).json({
            success: false,
            message
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
};

module.exports = errorHandler;