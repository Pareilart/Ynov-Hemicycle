const mongoose = require("mongoose");
export {};

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
    }],
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Role", roleSchema, "roles");