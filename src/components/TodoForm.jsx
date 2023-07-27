"use client";
import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  submitTodo,
  findSignleTodo,
  updateTodo,
} from "@/app/api/todoList/route";
import TodoTable from "./TodoTable";

function TodoForm({ data }) {
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const nameRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = async (formData) => {
    if (update) {
      const response = await updateTodo({
        name: formData.get("name"),
        description: formData.get("description"),
        id: updateId,
      });
      setUpdate(false);
      setUpdateId(false);
    } else {
      if (!formData.get("name") || !formData.get("description")) {
        return console.log("please fill form");
      }
      const response = await submitTodo({
        name: formData.get("name"),
        description: formData.get("description"),
      });
      console.log(response);
    }
    nameRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const handleUpdate = async (id) => {
    const response = await findSignleTodo({ id });
    const findTodo = JSON?.parse(response?.data);
    nameRef.current.value = findTodo?.name;
    descriptionRef.current.value = findTodo?.description;
    setUpdateId(findTodo?._id);
    setUpdate(true);
    console.log(response);
  };

  return (
    <div>
      <Container>
        <Form className="mt-5" action={handleSubmit}>
          <Row>
            <Col xs={12} sm={5}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  ref={nameRef}
                  placeholder="Enter task name"
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={5}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  ref={descriptionRef}
                  placeholder="Enter Description"
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={2} className="pt-2">
              <div className="mt-4">
                <Button variant="primary" type="submit">
                  {update ? "Update" : "Submit"}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        {![null, undefined].includes(data) && (
          <TodoTable data={data} update={handleUpdate} />
        )}
      </Container>
    </div>
  );
}

export default TodoForm;
