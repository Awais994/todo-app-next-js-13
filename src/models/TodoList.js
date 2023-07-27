import { model, Schema, models } from "mongoose";
const TodoListSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);
export const Todo =
  models.TodolistData || model("TodolistData", TodoListSchema);
