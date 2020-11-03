"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var passport_1 = __importDefault(require("passport"));
var passport_2 = __importDefault(require("../passport/passport"));
passport_2.default();
var requireAuth = passport_1.default.authenticate('jwt', { session: false });
var task_1 = require("../controllers/task");
router.post('/task/:listId', requireAuth, task_1.createTask);
router.get('/task/:id', requireAuth, task_1.getTask);
router.patch('/task/:id', requireAuth, task_1.updateTask);
router.delete('/task/:id', requireAuth, task_1.deleteTask);
exports.default = router;
