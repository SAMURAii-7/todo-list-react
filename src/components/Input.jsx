import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import List from "./List";
import { db, auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
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
    const [currUser, setCurrUser] = useState({});

    const navigate = useNavigate();

    const todoRef = collection(db, "todos");

    useEffect(() => {
        const authChange = onAuthStateChanged(auth, (currentUser) => {
            setCurrUser(currentUser);
        });
        authChange();
        return authChange;
    }, []);

    useEffect(() => {
        const getTodos = async () => {
            const data = await getDocs(todoRef);
            data.docs.forEach((doc) => {
                if (doc.data().email === auth.currentUser.email)
                    setTodos([...todos, { ...doc.data(), id: doc.id }]);
            });
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
        const newTodo = {
            text: input,
            isDone: false,
            id: uuidv4(),
            email: currUser.email,
        };
        setTodos([...todos, newTodo]);
        await addDoc(todoRef, newTodo);
        setInput("");
    };

    const logout = async (e) => {
        e.preventDefault();
        await signOut(auth);
        navigate("/", { replace: true });
    };

    return (
        <>
            <button onClick={logout} className="btn todo-logout">
                Logout
            </button>
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
        </>
    );
}

export default Tasks;
