import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

type AddTodoListAT = {
    type : "ADD-TODOLIST"
    title: string
}

type ChangeTodoListTitleAT ={
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}

export type ActionUnionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListReducer =
    (todoList: Array<TodolistType>, action: ActionUnionType): Array<TodolistType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todoList.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoListID =v1()
            const newTodoList: TodolistType = { id: newTodoListID, title: action.title, filter:"all"}
            return [...todoList,newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoList.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoList.map(tl => tl.id === action.todoListID ? {...tl, filter:action.filter} : tl)
        default: return todoList
    }
}

export const RemoveTodoListAC = (todoListID:string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID: todoListID}
}
export const AddTodoListAC = (newTodolistTitle:string): AddTodoListAT => {
    return {type: "ADD-TODOLIST", title: newTodolistTitle}
}
// export const ChangeTodoListTitleAC = (newTodolistTitle:string): ChangeTodoListTitleAT => {
//     return {type: "CHANGE-TODOLIST-TITLE", title: newTodolistTitle, todoListID: todoListID}
// }