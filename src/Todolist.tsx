import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todolistID: string) => void
    removeTodolist: (todolistId:string) => void
}

function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<boolean>(false)

    function addTasks() {
        if (title.trim()) {
            props.addTask(title, props.id);
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
    const setAllClickHandler = () => props.changeFilter("all", props.id);
    const setActiveClickHandler = () => props.changeFilter("active", props.id);
    const setCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const errorMessage = error
        ? <div className="error-message">"Title is required!"</div>
        : null

    const removeTodolist =() => {
        props.removeTodolist(props.id);
    }

    return <div>
        <h3> {props.title} <button onClick={removeTodolist}>x</button></h3>
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

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
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