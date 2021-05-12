import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    changeTaskTitle:(taskID: string, newTitle:string, todolistID:string)=> void
    changeTodoListTitle:(title: string, todoListID:string)=> void

}

function Todolist(props: PropsType) {

    const setAllClickHandler = () => props.changeFilter("all", props.id);
    const setActiveClickHandler = () => props.changeFilter("active", props.id);
    const setCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist =() => {
        props.removeTodolist(props.id);
    }
    const addTask =(title:string) => props.addTask(title, props.id)
    const changeTodoListTitle =(title:string) => props.changeTodoListTitle(title, props.id)

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask} />
        <ul>
            {

                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    const changeTaskTitle = (title:string) => props.changeTaskTitle(t.id, title, props.id)
                    return (
                        <li className={t.isDone ? "is-done" : ""} key={t.id}>
                            <input onChange={changeTaskStatus}
                                   type="checkbox" checked={t.isDone}/>
                            {/*<span>{t.title}</span>*/}
                            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
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