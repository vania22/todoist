"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var listSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
    },
    color: {
        type: String,
        required: true,
    },
    user: { type: ObjectId, ref: 'user' },
});
var List = mongoose_1.default.model('List', listSchema);
exports.default = List;
