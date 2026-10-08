const userService = require("../services/user.service");

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById
};