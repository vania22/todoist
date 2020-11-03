"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var DateRange;
(function (DateRange) {
    DateRange["TODAY"] = "Today";
    DateRange["TOMORROW"] = "Tomorrow";
    DateRange["NEXT_WEEK"] = "Next 7 days";
})(DateRange = exports.DateRange || (exports.DateRange = {}));
var taskSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateRange: {
        type: String,
        default: 'Today',
        enum: ['Today', 'Tomorrow', 'Next 7 days'],
    },
    listId: { type: ObjectId, ref: 'List' },
}, { timestamps: true });
var Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
