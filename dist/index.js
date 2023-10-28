"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const typeorm_config_1 = __importDefault(require("./src/db/typeorm.config"));
const taskRouter_1 = __importDefault(require("./src/routes/taskRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, typeorm_1.createConnection)(typeorm_config_1.default)
    .then(() => {
    console.log(" 🛜  Database connected successfully");
})
    .catch((error) => {
    console.error("Error connecting to the database:", error);
});
dotenv_1.default.config({ path: "config.env" });
app.use((0, morgan_1.default)("dev"));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// app.use(cookieParser());
// app.use(helmet());
app.use((0, cors_1.default)());
app.use('/', taskRouter_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
