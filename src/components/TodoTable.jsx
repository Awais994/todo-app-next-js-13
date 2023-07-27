"use client";
import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { deleteTodo } from "@/app/api/todoList/route";

function TodoTable({ data, update }) {
  // const todoArray = data ? JSON?.parse(data) : [];
  const deleteItem = async (id) => {
    console.log(id);
    const response = await deleteTodo({ id });
    console.log(response);
  };
  return (
    <Table className="mt-4" responsive="sm">
      <thead>
        <tr>
          {["Name", "Description", "Update", "Delete"].map((name) => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.length !== 0 ? (
          data?.map(({ _id, name, description }) => (
            <tr key={_id}>
              <td>{name}</td>
              <td>{description}</td>
              <td>
                <Button variant="success" onClick={() => update(_id)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteItem(_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>
              <p className="text-center mt-4">No data added yet</p>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default TodoTable;
