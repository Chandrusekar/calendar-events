"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const hpp_1 = __importDefault(require("hpp"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_2 = __importDefault(require("./config/passport"));
const app = (0, express_1.default)();
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
const user_1 = __importDefault(require("./routes/user"));
const events_1 = __importDefault(require("./routes/events"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false,
}));
// Set security HTTP headers
app.use((0, helmet_1.default)());
// Data sanitization against Nosql query injection
app.use((0, express_mongo_sanitize_1.default)());
// Prevent parameter pollution
app.use((0, hpp_1.default)());
// jwt authentication
app.use(passport_1.default.initialize());
passport_1.default.use("jwt", passport_2.default);
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
// Allow Cross-Origin requests
app.use((0, cors_1.default)(corsOptions));
// Define the custom token
morgan_1.default.token('id', function getId(req) {
    return req.id || '-';
});
app.use((0, morgan_1.default)(':remote-addr :date[web] :id :method :url :response-time', { stream: accessLogStream }));
app.get('', (req, res) => {
    res.json({ "greet": "welcome" });
});
app.use('/api', [user_1.default, events_1.default]);
// Custom error handler middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ 'msg': err.message });
});
exports.default = app;
