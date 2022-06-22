import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./List";
import { db } from "../firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

function Tasks() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    const todoRef = collection(db, "todos");

    useEffect(() => {
        const getTodos = async () => {
            const data = await getDocs(todoRef);
            setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getTodos();
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const deleteTodo = async (id) => {
        const currDoc = doc(db, "todos", id);
        setTodos(todos.filter((todo) => todo.id !== id));
        deleteDoc(currDoc);
    };

    const completedTodo = async (id) => {
        const currDoc = doc(db, "todos", id);
        let payload;
        todos.forEach((todo) => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone;
                payload = { isDone: todo.isDone };
            }
        });
        setTodos([...todos]);
        await updateDoc(currDoc, payload);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const newTodo = { text: input, isDone: false, id: uuidv4() };
        setTodos([...todos, newTodo]);
        await addDoc(todoRef, newTodo);
        setInput("");
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
                    {input.length >= 5 && (
                        <button
                            onClick={handleClick}
                            className="btn"
                            type="submit"
                        >
                            Add
                        </button>
                    )}
                </div>
                <List
                    todos={todos}
                    deleteTodo={deleteTodo}
                    completedTodo={completedTodo}
                />
            </div>
        </form>
    );
}

export default Tasks;
