import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import { createConnection } from "typeorm";
import connectionOptions from "./src/db/typeorm.config";
import taskRouter from "./src/routes/taskRouter";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();

const port = process.env.PORT;

createConnection(connectionOptions)
  .then(() => {
    console.log(" 🛜  Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

dotenv.config({ path: "config.env" });
app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(helmet());
app.use(cors());

app.use('/', taskRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
