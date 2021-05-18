import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
            <IconButton onClick={removeTodolist} color={"secondary"}><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <ul style={{listStyle:"none", paddingLeft:"0px"}}>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    const changeTaskTitle = (title:string) => props.changeTaskTitle(t.id, title, props.id)
                    return (
                        <li key={t.id}>
                            <span className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    color={"primary"}
                                    onChange={changeTaskStatus}
                                    checked={t.isDone}
                                />
                            {/*<input onChange={changeTaskStatus}*/}
                            {/*       type="checkbox" checked={t.isDone}/>*/}
                            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            </span>
                            <IconButton onClick={onClickHandler} color={"secondary"}>
                                <Delete/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button size={"small"} variant={props.filter === "all" ? "contained" : "outlined"} color={"primary"}
                    onClick={setAllClickHandler}>All
            </Button>
            <Button size={"small"} variant={props.filter === "active" ? "contained" : "outlined"} color={"primary"} style={{marginLeft: "3px"}}
                    onClick={setActiveClickHandler}>Active
            </Button>
            <Button size={"small"} variant={props.filter === "completed" ? "contained" : "outlined"} color={"primary"} style={{marginLeft: "3px"}}
                    onClick={setCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>

}

export default Todolist