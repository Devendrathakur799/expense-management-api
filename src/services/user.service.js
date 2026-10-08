const User = require("../models/User");

const createUser = async (userData) => {
    const existingUser = await User.findOne({
        email: userData.email.toLowerCase()
    });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    return await User.create({
        name: userData.name,
        email: userData.email.toLowerCase()
    });
};

const getUsers = async () => {
    return await User.find().sort({ createdAt: -1 });
};

const getUserById = async (id) => {
    return await User.findById(id);
};

module.exports = {
    createUser,
    getUsers,
    getUserById
};