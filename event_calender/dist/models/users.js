"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const roles_1 = require("../config/roles");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
    },
    userId: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    DOB: {
        type: String
    },
    Role: {
        type: String,
        enum: roles_1.roles,
        default: "admin",
    }
}, {
    collection: 'employee'
});
// Instance method to compare passwords
userSchema.methods.correctPassword = async function (typedPassword, originalPassword) {
    return await bcryptjs_1.default.compare(typedPassword, originalPassword);
};
// Middleware (pre hook) to hash password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcryptjs_1.default.hash(user.password, 12);
    }
    next();
});
// Create and export the Employee model
const Users = mongoose_1.default.model('Users', userSchema);
exports.default = Users;
