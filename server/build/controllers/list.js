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
exports.deleteList = exports.updateList = exports.getList = exports.createList = void 0;
var list_1 = __importDefault(require("../models/list"));
var task_1 = __importDefault(require("../models/task"));
exports.createList = function (req, res) {
    var list = new list_1.default(req.body);
    list.save(function (err, list) {
        if (err)
            return res.status(500).json(err);
        return res.json(list);
    });
};
exports.getList = function (req, res) {
    list_1.default.findById(req.params.id, function (err, list) {
        if (err)
            return res.status(500).json(err);
        return res.json(list);
    });
};
exports.updateList = function (req, res) {
    list_1.default.findByIdAndUpdate(req.params.id, __assign({}, req.body), { new: true }, function (err, list) {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            return res.json(list);
        }
    });
};
exports.deleteList = function (req, res) {
    list_1.default.findByIdAndRemove(req.params.id, function (err, list) {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            task_1.default.deleteMany({ listId: req.params.id }, function (err) {
                if (err) {
                    return res.status(500).json(err);
                }
            });
            return res.json(list);
        }
    });
};
