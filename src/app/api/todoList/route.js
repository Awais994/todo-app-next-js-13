"use server";
import dbConnect from "@/utils/dbConnect";
import { Todo } from "@/models/TodoList";
import { revalidatePath } from "next/cache";

dbConnect();
export const submitTodo = async (data) => {
  try {
    await Todo.createa(data);
    revalidatePath("/");

    return { status: true, code: 201, message: "Data add succefully" };
  } catch (e) {
    return { status: false, code: 400, message: "Try Again" };
  }
};

export const getTodo = async () => {
  try {
    const data = await Todo.find({});
    return { status: true, code: 200, data: JSON.parse(JSON.stringify(data)) };
  } catch (e) {
    return { status: false, code: 400, message: "Try Again" };
  }
};

export const deleteTodo = async (data) => {
  try {
    const { id } = data;
    const findData = await Todo.findById({ _id: id });
    if (!findData) {
      return { status: false, code: 404, message: "No data found" };
    }
    await Todo.findByIdAndDelete({ _id: id });
    revalidatePath("/");

    return { status: true, code: 200, message: "Data delete succefully" };
  } catch (e) {
    return { status: false, code: 400, message: "Try Again" };
  }
};

export const findSignleTodo = async (data) => {
  try {
    const { id } = data;
    const findData = await Todo.findById({ _id: id });
    if (!findData) {
      return { status: false, code: 404, message: "No data found" };
    }
    return {
      status: true,
      code: 200,
      data: JSON.stringify(findData),
    };
  } catch (error) {
    return { status: false, code: 400, message: "Try Again" };
  }
};

export const updateTodo = async (data) => {
  try {
    const { id, name, description } = data;
    const findData = await Todo.findById(id);
    if (!findData) {
      return { status: false, code: 404, message: "No data found" };
    }
    await Todo.findByIdAndUpdate(id, { name, description });
    revalidatePath("/");
    return { status: true, code: 200, message: "Update Succefully" };
  } catch (error) {
    return { status: false, code: 400, message: "Try Again" };
  }
};
