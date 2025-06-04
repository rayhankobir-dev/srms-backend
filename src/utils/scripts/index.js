const User = require("../../models/user.model.js");
const mongoose = require("mongoose");
require("dotenv").config();

const createUser = async (user) => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        const isAdminUserExist = await User.findOne({ email: user.email });
        if (isAdminUserExist) return
        await User.create(user);
        console.log("User created successfully");
        console.log("Credentials: ", user.email, user.password);
    } catch (error) {
        console.log("Faield to create user: ", error.message);
    }
};

createUser({
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@gmail.com",
    password: "@Admin123#",
    role: "ADMIN",
    phone: "1234567890",
    address: "",
});

