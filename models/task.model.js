import mongoose , { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    taskTitel: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    taskDescription: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    taskStatus: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
      trim: true,
    },
    taskPrioriyt: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      trim: true,
    },
    taskDeadline: {
      type: Date,
      required: false,
      unique: false,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
      default: null,
    },
    sharedWith: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);
export default Task;
