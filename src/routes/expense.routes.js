const express = require("express");

const {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
} = require("../controllers/expense.controller");

const {
    validateCreateExpense,
    validateUpdateExpense
} = require("../validations/expense.validation");

const router = express.Router();

router.post(
    "/",
    validateCreateExpense,
    createExpense
);

router.get("/", getExpenses);

router.get("/summary", getExpenseSummary);

router.get("/:id", getExpenseById);

router.put(
    "/:id",
    validateUpdateExpense,
    updateExpense
);

router.delete("/:id", deleteExpense);

module.exports = router;