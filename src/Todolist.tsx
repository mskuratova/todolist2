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
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void

}

function Todolist(props: PropsType) {
    const [title, setTitle] = useState("")

    const addTasks = () => {
        props.addTask(title);
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTasks()
        }
    }
    const setAllClickHandler = () => props.changeFilter("all");
    const setActiveClickHandler = () => props.changeFilter("active");
    const setCompletedClickHandler = () => props.changeFilter("completed");


    return <div>
        <h3> {props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressAddTask}/>
            <button onClick={addTasks}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={setAllClickHandler}>All</button>
            <button onClick={setActiveClickHandler}>Active</button>
            <button onClick={setCompletedClickHandler}>Completed</button>
        </div>
    </div>

}

export default Todolist