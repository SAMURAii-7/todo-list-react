import Item from "./Item"

function List({ todos, deleteTodo, completedTodo }) {
    const itemDelete = (id) => {
        deleteTodo(id)
    }

    const itemDone = (id) => {
        completedTodo(id)
    }

    return (
        <div className="list-outer">
            <ul>
                {todos.map(todo => (
                    <Item key={todo.id} text={todo.text} isDone={todo.isDone} itemDelete={() => itemDelete(todo.id)} itemDone={() => itemDone(todo.id)} />
                ))}
            </ul>
        </div>
    )
}

export default List