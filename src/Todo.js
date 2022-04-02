import { React, useState } from 'react';
import { Button, Col, Row, Collapse, InputGroup, FormControl } from 'react-bootstrap';
//import { XCircleFill } from 'react-bootstrap-icons';


const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};


export default function Todo({ todo, toggleTodo, deleteTodo }) {
  const [open, setOpen] = useState(false);
  const colors = ["secondary", "success", "danger", "warning", "info"];

  function getColor(item) {
      /* Maps first letter in item to char code to select a color */
      return colors[(item[0] || "A").toLowerCase().charCodeAt() % colors.length]
  }

  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  function handleDeleteTodo() {
    deleteTodo(todo.id)
  }


  return (
    <>
      <Row gap={3}>
        <Col xs={8} className="p-1 bg-white border" title={todo.name}>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={handleTodoClick} checked={todo.complete} />
            <FormControl 
                aria-label="Text input with checkbox" 
                aria-describedby="basic-addon2" 
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                placeholder={todo.id.toString() + ": " + truncate(todo.name, 25)} readOnly />
            <InputGroup.Text id="basic-addon2" onClick={handleDeleteTodo}>
                <Button className="btn btn-dark">X</Button>
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={2} className="p-1 bg-white border">

          {todo.people.map((person, index) => {
              const color = getColor(person); 
             return <span className={"btn btn-" + color + " disabled m-1"} key={index}>{person}</span>
          })}

        </Col>

        <Col xs={2} className="p-1 bg-white border">

          {todo.orgs.map((org, index) => {
              const color = getColor(org);
             return <span className={"btn btn-" + color + " disabled m-1"} key={index}>{org}</span>
          })}

        </Col>

      </Row>
      <Collapse in={open}>
              <div id="example-collapse-text">
                <div>Description: {todo.description}</div>
                <div>Last updated: {todo.updated}</div>
              </div>
      </Collapse>
    </>
  )
};
