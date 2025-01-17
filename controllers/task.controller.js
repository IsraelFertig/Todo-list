import Task from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      msg: "Task retrieved successfully.",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve tasks.",
      error: error.message || error,
    });
  }
};

export const addTask = async (req, res) => {
  console.log(req.body);
  try {
    if (!taskTitel || !taskDescription)
      throw new Error("Task title or description are required.");
    const newtask = await Task.create(req.body);
    res.status(200).json({
      success: true,
      msg: "Create task successfully",
      data: newtask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message || "Create task Failed",
      error,
    });
  }
};

export const deleteTaskById = async (req, res) => {
  console.log(req.params);
  try {
    if (!req.params.Id) throw new Error("Task ID is required.");
    const taskToDelete = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      msg: "task deleted successfully",
      data: taskToDelete,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message || "task NOT deleted successfully",
      error,
    });
  }
};

export const updateTaskStatusById = async (req, res) => {
    console.log(req.params);
    try {
       const taskId = req.params.id;
       const newstatus = req.body.status;
      if (!taskId) throw new Error("Task ID is required.");
      if (!newstatus) throw new Error("Task status is required.");
      const task = await Task.findByIdAndUpdate(taskId,{taskStatus:newstatus},{new:true});
      res.status(200).json({
        success: true,
        msg: "task update successfully",
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message || "task NOT update successfully",
        error,
      });
    }
  };
