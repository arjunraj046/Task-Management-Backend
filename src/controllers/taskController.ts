import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { uploadImage } from "../utils/fileUtils";
import { addTaskDB, getTaskWithID, getAllTaskDB, deleteTaskWithID, updateTaskDB } from "../db/respositories/taskSQL";

export const getAllTask = asyncHandler(async (req: Request, res: Response) => {
  try {
    console.log("Request to get all tasks.");

    const data = await getAllTaskDB();
    console.log(data);

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error while fetching tasks:", error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

export const addTask = asyncHandler(async (req: Request, res: Response) => {
  uploadImage(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "File upload error" });
    }
    console.log("file indengi", req.fileUrl);
    console.log(req.body);
    const data = req.body;
    const imageURL = req.fileUrl;
    try {
      let response = await addTaskDB(data, imageURL);
      res.json({
        status: "success",
        response,
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred ." });
    }
  });
});

export const editTask = asyncHandler(async (req: Request, res: Response) => {
  console.log("call here single task for editing ");
  uploadImage(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "File upload error" });
    }
    console.log("file indengi", req.fileUrl);
    console.log(req.body);
    const data = req.body;
    const imageURL = req.fileUrl;
    try {
      let UserID = Number(data.id)
      let response = await updateTaskDB(UserID,data, imageURL);
      res.json({
        status: "success",
        response,
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred ." });
    }
  });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  console.log("delete");

  try {
    const taskId = req.params.id;
    const data = await deleteTaskWithID(Number(taskId));
    console.log(data);

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error while deleting task:", error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

export const getTask = asyncHandler(async (req: Request, res: Response) => {
  console.log("call here ");
  try {
    const taskId = req.params.id;

    console.log(taskId);

    const data = await getTaskWithID(Number(taskId));
    console.log(data);

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error while fetching tasks:", error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});
