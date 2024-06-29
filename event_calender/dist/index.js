'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const log = console.log;
mongoose_1.default.Promise = global.Promise;
const httpServer = http_1.default.createServer(app_1.default);
const uri = process.env.DB || '';
mongoose_1.default.set('strictQuery', true);
// Connect to MongoDB
mongoose_1.default.connect(uri, {
    dbName: 'event_plan',
    autoIndex: false,
    autoCreate: true,
})
    .then((connection) => {
    console.log(`Connected to MongoDB! Database name: "${connection.connections[0].name}"`);
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    log(`Server running`);
});
