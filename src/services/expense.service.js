const Expense = require("../models/Expense");
const User = require("../models/User");

const createExpense = async (expenseData) => {
    const user = await User.findById(expenseData.userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return await Expense.create(expenseData);
};

const getExpenses = async (query) => {
    let {
        page = 1,
        limit = 10,
        userId,
        category,
        fromDate,
        toDate
    } = query;

    page = Number(page);
    limit = Number(limit);

    if (!Number.isInteger(page) || page < 1) {
        const error = new Error("Page must be a positive integer");
        error.statusCode = 400;
        throw error;
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        const error = new Error("Limit must be between 1 and 100");
        error.statusCode = 400;
        throw error;
    }

    const filter = {};

    if (userId) {
        if (!require("mongoose").Types.ObjectId.isValid(userId)) {
            const error = new Error("Invalid userId");
            error.statusCode = 400;
            throw error;
        }

        filter.userId = userId;
    }

    if (category) {
        filter.category = category;
    }

    if (fromDate || toDate) {
        filter.createdAt = {};

        if (fromDate) {
            const startDate = new Date(fromDate);

            if (isNaN(startDate.getTime())) {
                const error = new Error("Invalid fromDate");
                error.statusCode = 400;
                throw error;
            }

            filter.createdAt.$gte = startDate;
        }

        if (toDate) {
            const endDate = new Date(toDate);

            if (isNaN(endDate.getTime())) {
                const error = new Error("Invalid toDate");
                error.statusCode = 400;
                throw error;
            }

            endDate.setHours(23, 59, 59, 999);

            filter.createdAt.$lte = endDate;
        }
    }

    if (fromDate && toDate) {
        if (new Date(fromDate) > new Date(toDate)) {
            const error = new Error(
                "fromDate cannot be greater than toDate"
            );

            error.statusCode = 400;
            throw error;
        }
    }

    const skip = (page - 1) * limit;

    const [expenses, total] = await Promise.all([
        Expense.find(filter)
            .populate("userId", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Expense.countDocuments(filter)
    ]);

    return {
        expenses,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getExpenseById = async (id) => {
    return await Expense.findById(id).populate(
        "userId",
        "name email"
    );
};

const updateExpense = async (id, data) => {
    return await Expense.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    ).populate("userId", "name email");
};

const deleteExpense = async (id) => {
    return await Expense.findByIdAndDelete(id);
};

const getExpenseSummary = async () => {
    const summary = await Expense.aggregate([
        {
            $group: {
                _id: null,
                totalExpenses: { $sum: 1 },
                totalAmount: { $sum: "$amount" }
            }
        }
    ]);

    const categorySummary = await Expense.aggregate([
        {
            $group: {
                _id: "$category",
                totalAmount: { $sum: "$amount" },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                totalAmount: -1
            }
        }
    ]);

    return {
        totalExpenses: summary[0]?.totalExpenses || 0,
        totalAmount: summary[0]?.totalAmount || 0,
        byCategory: categorySummary
    };
};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
};