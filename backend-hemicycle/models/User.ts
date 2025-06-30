const mongoose = require("mongoose");
export {};

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        birthday: {
            type: Date,
            required: true,
        },
        sexe: {
            type: String,
            enum: ["Homme", "Femme", "Autre"],
            required: true,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Addresses",
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        emailVerifiedAt: {
            type: Date,
            required: false,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        votingSurveys : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "votingSurveys",
            required: false
        }
    },
);

module.exports = mongoose.model("User", userSchema, "users");