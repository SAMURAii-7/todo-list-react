import { FaCheck, FaTrash } from "react-icons/fa"

function Item({ text, isDone, itemDelete, itemDone }) {
    return (
        <div className="card">
            <li style={{ textDecoration: isDone ? "line-through" : "none" }} >
                {text}
            </li>
            <div className="icons" >
                <button onClick={() => itemDone()} className="icon-btn" type="button" >
                    <FaCheck size={20} color="green" />
                </button>
                <button onClick={() => itemDelete()} className="icon-btn" >
                    <FaTrash size={20} color="crimson" />
                </button>
            </div>
        </div>
    )
}

export default Item