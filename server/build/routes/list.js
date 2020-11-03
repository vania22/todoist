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
var list_1 = require("../controllers/list");
router.post('/list', requireAuth, list_1.createList);
router.get('/list/:id', requireAuth, list_1.getList);
router.patch('/list/:id', requireAuth, list_1.updateList);
router.delete('/list/:id', requireAuth, list_1.deleteList);
exports.default = router;
