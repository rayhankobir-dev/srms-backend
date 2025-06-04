const User = require("../models/user.model.js");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const createUser = async (user) => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        const isAdminUserExist = await User.findOne({ email: user.email });
        if (isAdminUserExist) throw new Error("User already exist");
        
        const hashedPassword = await bcrypt.hash(user.password,10);
        await User.create({
            ...user,
            password: hashedPassword
        });
        console.log("User created successfully");
        console.log("Credentials: ", user.email, user.password);
        process.exit(0);
    } catch (error) {
        console.log("Faield to create user: ", error.message);
        process.exit(1);
    }
};

createUser({
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@gmail.com",
    password: "@Admin123#",
    role: "ADMIN",
    phone: "1234567890",
    address: "Demo",
});

