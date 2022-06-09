import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import List from "./List";

function Tasks() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([{ text: "This is a sample todo", isDone: false, id: uuidv4() }]);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const completedTodo = (id) => {
        todos.forEach((todo) => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone
                setTodos([...todos])
            }
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        setTodos([...todos, { text: input, isDone: false, id: uuidv4() }])
        setInput("")
    };

    return (
        <form>
            <div className="outer">
                <h2>Todo List</h2>
                <div className="container">
                    <input
                        value={input}
                        onChange={handleChange}
                        className="todo-task"
                        placeholder="Add a new task to your todo list"
                        type="text"
                    />
                    {input.length >= 5 && (<button onClick={handleClick} className="btn" type="submit">Add</button>)}
                </div>
                <List todos={todos} deleteTodo={deleteTodo} completedTodo={completedTodo} />
            </div>
        </form>
    );
}

export default Tasks;
