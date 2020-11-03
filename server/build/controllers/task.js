"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = void 0;
var task_1 = __importDefault(require("../models/task"));
exports.createTask = function (req, res) {
    var task = new task_1.default(__assign(__assign({}, req.body), { listId: req.params.listId }));
    task.save(function (err, task) {
        if (err)
            return res.status(500).json(err);
        return res.json(task);
    });
};
exports.getTask = function (req, res) {
    task_1.default.findById(req.params.id, function (err, task) {
        if (err)
            return res.status(500).json(err);
        return res.json(task);
    });
};
exports.updateTask = function (req, res) {
    task_1.default.findByIdAndUpdate(req.params.id, __assign({}, req.body), { new: true }, function (err, task) {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            return res.json(task);
        }
    });
};
exports.deleteTask = function (req, res) {
    task_1.default.findByIdAndRemove(req.params.id, function (err, task) {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            return res.json(task);
        }
    });
};
