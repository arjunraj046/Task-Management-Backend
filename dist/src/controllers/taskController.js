"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = exports.deleteTask = exports.editTask = exports.addTask = exports.getAllTask = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const fileUtils_1 = require("../utils/fileUtils");
const taskSQL_1 = require("../db/respositories/taskSQL");
exports.getAllTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request to get all tasks.");
        const data = yield (0, taskSQL_1.getAllTaskDB)();
        console.log(data);
        res.json({
            status: "success",
            data,
        });
    }
    catch (error) {
        console.error("Error while fetching tasks:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}));
exports.addTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, fileUtils_1.uploadImage)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ error: "File upload error" });
        }
        console.log("file indengi", req.fileUrl);
        console.log(req.body);
        const data = req.body;
        const imageURL = req.fileUrl;
        try {
            let response = yield (0, taskSQL_1.addTaskDB)(data, imageURL);
            res.json({
                status: "success",
                response,
            });
        }
        catch (error) {
            res.status(500).json({ message: "An error occurred ." });
        }
    }));
}));
exports.editTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("call here single task for editing ");
    (0, fileUtils_1.uploadImage)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ error: "File upload error" });
        }
        console.log("file indengi", req.fileUrl);
        console.log(req.body);
        const data = req.body;
        const imageURL = req.fileUrl;
        try {
            let UserID = Number(data.id);
            let response = yield (0, taskSQL_1.updateTaskDB)(UserID, data, imageURL);
            res.json({
                status: "success",
                response,
            });
        }
        catch (error) {
            res.status(500).json({ message: "An error occurred ." });
        }
    }));
}));
exports.deleteTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("delete");
    try {
        const taskId = req.params.id;
        const data = yield (0, taskSQL_1.deleteTaskWithID)(Number(taskId));
        console.log(data);
        res.json({
            status: "success",
            data,
        });
    }
    catch (error) {
        console.error("Error while deleting task:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}));
exports.getTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("call here ");
    try {
        const taskId = req.params.id;
        console.log(taskId);
        const data = yield (0, taskSQL_1.getTaskWithID)(Number(taskId));
        console.log(data);
        res.json({
            status: "success",
            data,
        });
    }
    catch (error) {
        console.error("Error while fetching tasks:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}));
