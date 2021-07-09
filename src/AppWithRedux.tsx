import React, {useCallback, useReducer} from 'react'
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, IconButton, Paper, Toolbar, Typography, Button, Grid} from "@material-ui/core";
import { Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTasksAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType ={
    [key:string]: Array<TaskType>
}
export function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType,TodolistType[] >(
        state => state.todoLists
    )
    const tasks = useSelector<AppRootStateType,TasksStateType >(
        state => state.tasks
    )
    const dispatch = useDispatch()

    const removeTodolist = useCallback((todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
       dispatch(action)
    },[dispatch])
    const removeTasks = useCallback((id: string, todolistId: string) => {
        dispatch(RemoveTasksAC (id, todolistId))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch])
    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todolistId))
    },[dispatch])
    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskID,newTitle, todolistId))
    },[dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(ChangeTodoListFilterAC(todolistID, value))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todolistID: string) => {
        dispatch(ChangeTodoListTitleAC (title, todolistID))
    },[dispatch])

    const addTodoList = useCallback((title:string)=> {
        let action =AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    // function getTasksForTodoList(todoList: TodolistType) {
    //     switch (todoList.filter) {
    //         case "active":
    //             return tasks[todoList.id].filter(t => !t.isDone)
    //         case "completed":
    //             return tasks[todoList.id].filter(t => t.isDone)
    //         default:
    //             return tasks[todoList.id]
    //     }
    // }

    const todoListComponents = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        return (

                <Grid item key={tl.id}>
                    <Paper elevation={5} style={{padding:"20px"}}>
                        <Todolist
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            filter={tl.filter}
                            removeTask={removeTasks}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
        }
    )

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent:"space-between"}}>
                    <IconButton color={'inherit'}>
                        <Menu />
                    </IconButton>
                    <Typography variant={"h6"}>
                        TodoLists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px 0px"} }>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}



