import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import About from './about.js'
import { Button, Col, Container, Form, Navbar, Nav, Row, Collapse, InputGroup, FormControl } from 'react-bootstrap';
import { NavLink, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
const SERVICE = 'http://192.168.50.70:8999'

function App() {
  const [todos, setTodos] = useState([]);
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const todoTitleRef = useRef();
  const todoDescRef = useRef();
  const todoPeopleRef = useRef();
  const todoOrgsRef = useRef();

  // Do these things onLoad
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const getTodos = async () => {
      const tasksFromServer = await fetchTasks()
      setTodos(tasksFromServer)
    }

    getTodos()
  }, [])

  // Fetch Todos
  const fetchTasks = async () => {
    const res = await fetch(`${SERVICE}/todos`)
    const data = await res.json()
    console.log(data)
    return data
  }

  // Delete Todo 
  const deleteTodo = async (id) => {
    await fetch(`${SERVICE}/todos/${id}`, {
      method: 'DELETE'
    })

    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Add Todo
  const addTodo = async (todo) => {
    const res = await fetch(`${SERVICE}/todos`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(todo)
    })

    const data = await res.json()

    setTodos([...todos, data])
  }

  // Update Todo
  const updateTodo = async (todo) => {
    const res = await fetch(`${SERVICE}/todos/update`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(todo)
    })

    const data = await res.json()

//    setTodos([...todos, data])
  }

    
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    updateTodo(todo)

    setTodos(newTodos) 
  }

  function prep_array(s, sep) {
    return s.split(sep).map(item => item.trim()).sort()
  }

  function clearAddTodoForm() {
    todoTitleRef.current.value = null
    todoDescRef.current.value = null
    todoPeopleRef.current.value = null
    todoOrgsRef.current.value = null
  }

  const handleAddTodo = async (e) => {
    const name = todoTitleRef.current.value
    const desc = todoDescRef.current.value
    const people = todoPeopleRef.current.value || ""
    const orgs = todoOrgsRef.current.value || ""

    if (name === '') return

    const todo = { name: name, description: desc, complete: false, 
                   people: prep_array(people, ","),
                   orgs:   prep_array(orgs, ",") }

    console.log(todo);
    // Make async call to server
    await addTodo(todo)

    clearAddTodoForm()
/*    todoTitleRef.current.value = null 
    todoDescRef.current.value = null
    todoPeopleRef.current.value = null
    todoOrgsRef.current.value = null
*/

    // Collapse the add window
    setOpenAddTodo(!openAddTodo)
  }

  function handleCancelAddTodo() {
    setOpenAddTodo(!openAddTodo)
    clearAddTodoForm()
  }

  function handleClearComplete() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  } 

  function sortCompleted() {
    const uncompletedTodos = todos.filter(todo => !todo.complete)
    const completedTodos = todos.filter(todo => todo.complete)
    setTodos(uncompletedTodos.concat(completedTodos))
  }

  return (
  <div className='app'>
  <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">
       <Button className="mx-3" onClick={() => sortCompleted()}>SORT</Button>

       <img className="mx-3" style={{width: "120px"}} src="./logo.png" alt="TodoApp Logo" />
       <span style={{position: "relative", left: "-50px", color: "cyan", "textShadow": "1px 1px blue"}}>
          TodoApp
       </span>
    </Navbar.Brand>
    <Nav className="ml-auto" gap={3}>
      <Button className="mx-3"
                onClick={() => setOpenAddTodo(!openAddTodo)}
                aria-controls="add-todo-form"
                aria-expanded={openAddTodo}>Add Todo</Button>
      <Button onClick={handleClearComplete} className="mx-3">Hide completed</Button>
      <Nav.Link href="#tasks">
        <div>Tasks&nbsp;<Button className="btn btn-warning m-1 p-1">{todos.filter(todo => !todo.complete).length}</Button></div>
      </Nav.Link>
      <Nav.Link href="#people">People</Nav.Link>
      <Nav.Link href="#orgs">Orgs</Nav.Link>
      <Nav.Link href="#groups">Groups</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  <br/>

{/*  Form to add a new todo */}
    <Container>
      <Collapse in={openAddTodo}>
        <Row gap={3} className="p-4" id="add-todo-form">
          <Col>
            <Form>
              <Row className="g-3 mb-3">

  <Form.Group className="mb-3" controlId="a3">
    <Form.Label>Title</Form.Label>
    <Form.Control placeholder="Title of task..." ref={todoTitleRef} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="a4">
    <Form.Label>Description</Form.Label>
    <Form.Control type="textarea" ref={todoDescRef} placeholder="Description of task..." style={{ height: "100px"}} />
  </Form.Group>
              </Row>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="a1">
      <Form.Label>People</Form.Label>
      <Form.Control type="text" placeholder="" ref={todoPeopleRef} />
    </Form.Group>

    <Form.Group as={Col} controlId="a2">
      <Form.Label>Orgs</Form.Label>
      <Form.Control type="text" placeholder="" ref={todoOrgsRef} />
    </Form.Group>
  </Row>

  <Button variant="primary" onClick={handleAddTodo}>
    Save
  </Button>
   <Button className="mx-3" variant="primary" 
    onClick={() => handleCancelAddTodo()}
                aria-controls="add-todo-form"
                aria-expanded={openAddTodo}>
    Cancel
  </Button>


            </Form>

          </Col>
        </Row>
      </Collapse>
    <Row>
      <Col>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} setTodos={setTodos} />
      </Col>
    </Row>
    </Container>


    <Navigation />
    <Main />


    </div>
  )
};

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact="true" activeclassname="current" to='/'>Home</NavLink></li>
      <li><NavLink exact="true" activeclassname="current" to='/about'>About</NavLink></li>
    </ul>
  </nav>
);

const Home = () => (
  <div className='home'>
    <h1>To-do list for the to-do app</h1>
    <p>Some work to do:</p>
<ol>
    <li>We now have a sortable list: https://www.npmjs.com/package/react-sortablejs - for sortable/draggable items</li>
    <li>BUT: we need to...</li> 
    <li>Will need to have a backend call: reorder/todo_id/position - which will sort the list of tasks accordingly</li>

</ol>
  </div>
);

const Main = () => (
  <Routes>
    <Route exact path='/' element={ <Home/> }></Route>
    <Route exact path='/about' element={ <About/> }></Route>
  </Routes>
);

export default App;
