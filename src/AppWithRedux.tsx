import React, {useReducer} from 'react'
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

    // const todolistId1 = v1();
    // const todolistId2 = v1();
    //
    // const [todoList, dispatchToTodolist] = useReducer(todoListReducer,
    //     [
    //     {id:todolistId1, title: "What to learn", filter: "all"},
    //     {id:todolistId2, title: "What to buy", filter: "all"}
    // ])
    // const [tasks, dispatchToTasks] =  useReducer( tasksReducer, {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Book", isDone: true}
    //     ]
    // });

    let removeTodolist = (todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
       dispatch(action)
    }

    function removeTasks(id: string, todolistId: string) {
        dispatch(RemoveTasksAC (id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }


    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todolistId))
    }
    function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskID,newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        dispatch(ChangeTodoListFilterAC(todolistID, value))
    }
    function changeTodoListTitle(title: string, todolistID: string) {
        dispatch(ChangeTodoListTitleAC (title, todolistID))
    }

    function addTodoList(title:string) {
        let action =AddTodoListAC(title)
        dispatch(action)
    }

    function getTasksForTodoList(todoList: TodolistType) {
        switch (todoList.filter) {
            case "active":
                console.log('active',tasks[todoList.id])
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                console.log('completed',tasks[todoList.id])
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                console.log('all',tasks[todoList.id])
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        return (
                <Grid item key={tl.id}>
                    <Paper elevation={5} style={{padding:"20px"}}>
                        <Todolist
                            id={tl.id}
                            title={tl.title}
                            tasks={getTasksForTodoList(tl)}
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

                {/*{todoListComponents}*/}
            </Container>
        </div>
    );
}



