import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    timestamp: { type: Number, required: true },
    uuid: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['info', 'warn', 'error'] },
    message: { type: String, required: true },
},
{
    timestamps: false,
});

export const Log = mongoose.model("Log", logSchema);