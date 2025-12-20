import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    permissions: { type: [String], enum: ['read', 'create'], default: [] },
    isAdmin: { type: Boolean, default: false },
});

export const User = mongoose.model("User", userSchema);