const expenseService = require("../services/expense.service");

const createExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.createExpense(req.body);

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense
        });
    } catch (error) {
        next(error);
    }
};

const getExpenses = async (req, res, next) => {
    try {
        const result = await expenseService.getExpenses(req.query);

        res.status(200).json({
            success: true,
            data: result.expenses,
            pagination: result.pagination
        });
    } catch (error) {
        next(error);
    }
};

const getExpenseById = async (req, res, next) => {
    try {
        const expense = await expenseService.getExpenseById(
            req.params.id
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            data: expense
        });
    } catch (error) {
        next(error);
    }
};

const updateExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.updateExpense(
            req.params.id,
            req.body
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expense
        });
    } catch (error) {
        next(error);
    }
};

const deleteExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.deleteExpense(
            req.params.id
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

const getExpenseSummary = async (req, res, next) => {
    try {
        const summary = await expenseService.getExpenseSummary();

        res.status(200).json({
            success: true,
            data: summary
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
};