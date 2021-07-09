import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolist-reducer";
import {TaskType} from "../Todolist";


type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskID: string
    todolistID: string

}
type AddTaskAC = {
    type : "ADD-TASK"
    title: string
    todolistID : string
}
type ChangeTaskStatusAC = {
    type: "CHANGE-TASKS-STATUS"
    taskID: string
    newIsDoneValue: boolean
    todolistID: string
}
type ChangeTaskTitleAC ={
    type: "CHANGE-TASKS-TITLE"
    taskID: string
    newTitle: string
    todolistID: string}

export type ActionUnionType = RemoveTaskAT | AddTaskAC | ChangeTaskStatusAC |ChangeTaskTitleAC | AddTodoListAT |RemoveTodoListAT;

const initialState: TasksStateType = {}


export const tasksReducer =
    (state: TasksStateType = initialState, action: ActionUnionType): TasksStateType => {
    switch (action.type){
        case "REMOVE-TASK":
            let todolistTasks = state[action.todolistID];
            todolistTasks = todolistTasks.filter(t => t.id !== action.taskID)
            return {...state, [action.todolistID]: todolistTasks}
        case "ADD-TASK":
            let task: TaskType = {id: v1(), title: action.title, isDone: false};
            return {...state,
                [action.todolistID]:[task,...state[action.todolistID]]
            }
        case "CHANGE-TASKS-STATUS":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => {
                    if (task.id === action.taskID) {
                        return { ...task, isDone: action.newIsDoneValue}
                 } else {
                        return task
                    }
                })
            }
        case "CHANGE-TASKS-TITLE":
            return {...state, [action.todolistID]: state[action.todolistID].map(task => {
                if (task.id === action.taskID) {
                    return {...task, title: action.newTitle}
                } else {
                    return task
                }
                })}
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistID]:[]
            }
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.todoListID]
            return newState

        default: return state
    }
}

export const RemoveTasksAC = (tasksID : string, todoListID:string): RemoveTaskAT => {
    return {type: "REMOVE-TASK", taskID: tasksID, todolistID: todoListID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskAC => {
    return {type: "ADD-TASK",title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, newIsDoneValue: boolean, todolistID: string):ChangeTaskStatusAC=> {
    return {type: "CHANGE-TASKS-STATUS", taskID, newIsDoneValue, todolistID}
}
export const changeTaskTitleAC = (taskID: string, newTitle: string, todolistID: string):ChangeTaskTitleAC=> {
    return {type: "CHANGE-TASKS-TITLE", taskID, newTitle, todolistID}
}


