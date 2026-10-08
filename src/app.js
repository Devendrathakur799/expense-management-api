require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Expense Management API is running"
    });
});

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});