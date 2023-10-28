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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskDB = exports.deleteTaskWithID = exports.getTaskWithID = exports.addTaskDB = exports.getAllTaskDB = void 0;
const typeorm_1 = require("typeorm");
const task_1 = require("../entities/task");
const getAllTaskDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const TaskRepository = (0, typeorm_1.getRepository)(task_1.Task);
    try {
        const data = yield TaskRepository.find();
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllTaskDB = getAllTaskDB;
const addTaskDB = (data, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(imageUrl);
    let url = imageUrl;
    let task = {
        heading: data === null || data === void 0 ? void 0 : data.heading,
        description: data === null || data === void 0 ? void 0 : data.description,
        date: data === null || data === void 0 ? void 0 : data.date,
        time: data === null || data === void 0 ? void 0 : data.time,
        priority: data === null || data === void 0 ? void 0 : data.priority,
        imageUrl: url,
    };
    console.log(task);
    try {
        const TaskRepository = (0, typeorm_1.getRepository)(task_1.Task);
        const res = yield TaskRepository.save(task);
        return res;
    }
    catch (error) {
        throw error;
    }
});
exports.addTaskDB = addTaskDB;
const getTaskWithID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    try {
        const TaskRepository = (0, typeorm_1.getRepository)(task_1.Task);
        const options = {
            where: { id: id },
        };
        const res = yield TaskRepository.findOne(options);
        return res;
    }
    catch (error) {
        throw error;
    }
});
exports.getTaskWithID = getTaskWithID;
const deleteTaskWithID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TaskRepository = (0, typeorm_1.getRepository)(task_1.Task);
        const res = yield TaskRepository.delete(id);
        return res;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTaskWithID = deleteTaskWithID;
const updateTaskDB = (taskId, data, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TaskRepository = (0, typeorm_1.getRepository)(task_1.Task);
        // Fetch the existing task based on taskId
        const existingTask = yield TaskRepository.findOne({
            where: { id: taskId },
        });
        if (!existingTask) {
            throw new Error("Task not found");
        }
        // Update the fields with new data
        existingTask.heading = data === null || data === void 0 ? void 0 : data.heading;
        existingTask.description = data === null || data === void 0 ? void 0 : data.description;
        existingTask.date = data === null || data === void 0 ? void 0 : data.date;
        existingTask.time = data === null || data === void 0 ? void 0 : data.time;
        existingTask.priority = data === null || data === void 0 ? void 0 : data.priority;
        existingTask.imageUrl = imageUrl;
        // Save the updated task
        const updatedTask = yield TaskRepository.save(existingTask);
        return updatedTask;
    }
    catch (error) {
        throw error;
    }
});
exports.updateTaskDB = updateTaskDB;
