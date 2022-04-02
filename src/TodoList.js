import React from 'react';
import Todo from './Todo'
//import { ReactSortable } from "react-sortablejs";
import { Container } from 'react-bootstrap';

export default function TodoList({ todos, toggleTodo, deleteTodo, setTodos }) {
  return (
    <Container className="bg-light border d-grid gap-3 py-3">
        {todos.map(todo => {
            return (<Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />)
        })}
    </Container>
//    <ReactSortable list={todos} setList={setTodos}>
//     {todos.map((todo) => (
//        <div key={todo.id}>{todo.name}</div>
//          <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
//      ))}
//    </ReactSortable>
  )
}


