import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
    task: TaskType
    todilistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todilistId)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todilistId)
    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.task.id, title, props.todilistId), [props.changeTaskTitle,props.task.id, props.todilistId])
    return (
        <li key={props.task.id}>
                            <span className={props.task.isDone ? "is-done" : ""}>
                                <Checkbox
                                    color={"primary"}
                                    onChange={changeTaskStatus}
                                    checked={props.task.isDone}
                                />
                                <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
                            </span>
            <IconButton onClick={onClickHandler} color={"secondary"}>
                <Delete/>
            </IconButton>
        </li>
    )
})