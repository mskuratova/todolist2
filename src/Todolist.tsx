import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
}

function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<boolean>(false)

    const addTasks = () => {
        if (title.trim()) {
            props.addTask(title);
        } else {
            setError(true)
        }
        setTitle("")

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTasks()
        }
    }
    const setAllClickHandler = () => props.changeFilter("all");
    const setActiveClickHandler = () => props.changeFilter("active");
    const setCompletedClickHandler = () => props.changeFilter("completed");
    const errorMessage = error
        ? <div className="error-message">"Title is required!"</div>
        : null

    return <div>
        <h3> {props.title}</h3>
        <div>
            <input className={error ? "error" : ""}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressAddTask}/>
            <button onClick={addTasks}>+</button>
            {errorMessage}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
                    return (
                        <li className={t.isDone ? "is-done" : ""} key={t.id}>
                            <input onChange={changeTaskStatus}
                                   type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={setAllClickHandler}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={setActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={setCompletedClickHandler}>Completed
            </button>
        </div>
    </div>

}

export default Todolist