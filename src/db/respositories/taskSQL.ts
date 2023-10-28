import { FindOneOptions, getRepository } from "typeorm";
import { Task } from "../entities/task";
import { log } from "console";

export const getAllTaskDB = async () => {
  const TaskRepository = getRepository(Task);
  try {
    const data = await TaskRepository.find();
    return data;
  } catch (error) {
    throw error;
  }
};

export const addTaskDB = async (data: any, imageUrl: any) => {
  // console.log(imageUrl);
  let url: string = imageUrl;

  let task = {
    heading: data?.heading,
    description: data?.description,
    date: data?.date,
    time: data?.time,
    priority: data?.priority,
    imageUrl: url,
  };

  console.log(task);

  try {
    const TaskRepository = getRepository(Task);
    const res = await TaskRepository.save(task);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getTaskWithID = async (id: number) => {
  console.log(id);

  try {
    const TaskRepository = getRepository(Task);
    const options: FindOneOptions<Task> = {
      where: { id: id },
    };
    const res = await TaskRepository.findOne(options);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskWithID = async (id: number) => {
  try {
    const TaskRepository = getRepository(Task);
    const res = await TaskRepository.delete(id);
    return res;
  } catch (error) {
    throw error;
  }
};
export const updateTaskDB = async (taskId: number, data: any, imageUrl: any) => {
  try {
    const TaskRepository = getRepository(Task);

    // Fetch the existing task based on taskId
    const existingTask = await TaskRepository.findOne({
      where: { id: taskId },
    });

    if (!existingTask) {
      throw new Error("Task not found");
    }

    // Update the fields with new data
    existingTask.heading = data?.heading;
    existingTask.description = data?.description;
    existingTask.date = data?.date;
    existingTask.time = data?.time;
    existingTask.priority = data?.priority;
    existingTask.imageUrl = imageUrl;

    // Save the updated task
    const updatedTask = await TaskRepository.save(existingTask);

    return updatedTask;
  } catch (error) {
    throw error;
  }
}


