const express = require("express");

const {
    createUser,
    getUsers,
    getUserById
} = require("../controllers/user.controller");

const validateUser = require("../validations/user.validation");

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;