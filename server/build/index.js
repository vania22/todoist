"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = express_1.default();
var auth_1 = __importDefault(require("./routes/auth"));
var list_1 = __importDefault(require("./routes/list"));
var task_1 = __importDefault(require("./routes/task"));
mongoose_1.default
    .connect('mongodb://localhost/todoist', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(function () { return console.log('Connected to database'); });
app.use(morgan_1.default('combined'));
app.use(body_parser_1.default.json());
app.use(auth_1.default);
app.use(list_1.default);
app.use(task_1.default);
app.listen(3000, function () {
    console.log('Server started');
});
