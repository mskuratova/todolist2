import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist ")
    const setAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const setActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const setCompletedClickHandler =useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id])
    const addTask = useCallback((title:string) => props.addTask(title, props.id), [props.addTask, props.id])
    const changeTodoListTitle =useCallback((title:string) => props.changeTodoListTitle(title, props.id), [props.changeTodoListTitle, props.id])

    let tasksForTodolist = props.tasks;
    if (props.filter ==="active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }
    if (props.filter ==="completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
            <IconButton onClick={removeTodolist} color={"secondary"}><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <ul style={{listStyle:"none", paddingLeft:"0px"}}>
            {
                tasksForTodolist.map(t => <Task
                        changeTaskStatus={props.changeTaskStatus} changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask} task={t} todilistId={props.id} key={t.id}/>
                    // const onClickHandler = () => props.removeTask(t.id, props.id)
                    // const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    // const changeTaskTitle = (title:string) => props.changeTaskTitle(t.id, title, props.id)
                    // return (
                    //     <li key={t.id}>
                    //         <span className={t.isDone ? "is-done" : ""}>
                    //             <Checkbox
                    //                 color={"primary"}
                    //                 onChange={changeTaskStatus}
                    //                 checked={t.isDone}
                    //             />
                    //         {/*<input onChange={changeTaskStatus}*/}
                    //         {/*       type="checkbox" checked={t.isDone}/>*/}
                    //         <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    //         </span>
                    //         <IconButton onClick={onClickHandler} color={"secondary"}>
                    //             <Delete/>
                    //         </IconButton>
                    //     </li>
                    // )
                )
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

})

export default Todolist



