import { ConnectionOptions } from "typeorm";
import { Task } from "./entities/task";
import dotenv from "dotenv";

dotenv.config();

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Task],
  synchronize: true,
};

 
export default connectionOptions;
