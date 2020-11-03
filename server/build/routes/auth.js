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
var requireSignIn = passport_1.default.authenticate('local', { session: false });
var auth_1 = require("../controllers/auth");
router.post('/signup', auth_1.signUp);
router.post('/signin', requireSignIn, auth_1.signIn);
exports.default = router;
