import React, {useState} from 'react'
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todoList, setTodolist] = useState<Array<TodolistType>>([
        {id:todolistId1, title: "What to learn", filter: "all"},
        {id:todolistId2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Book", isDone: true}
        ]
    });

    let removeTodolist = (todoListId: string) => {
        let filterTodolist = todoList.filter(tl => tl.id !== todoListId)
        setTodolist(filterTodolist);
        delete tasks[todoListId];
        setTasks({...tasks});
    }

    function removeTasks(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task: TaskType = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }


    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = newIsDoneValue;
            setTasks({...tasks})

        }
    }
    function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
      setTasks({...tasks, [todolistId]:tasks[todolistId].map(t=>t.id ===taskID ? {...t, title:newTitle} :t)
      })

    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodolist(todoList.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }
    function changeTodoListTitle(title: string, todolistID: string) {
        setTodolist(todoList.map(tl => tl.id === todolistID ? {...tl, title} : tl))
    }

    function addTodoList(title:string) {
        const newTodoListID = v1()
        const newTodoList: TodolistType ={id: newTodoListID, title, filter: "all"}
        setTodolist([...todoList,newTodoList])
        setTasks({...tasks,[newTodoListID]:[]})
    }

    function getTasksForTodoList(todoList: TodolistType) {
        switch (todoList.filter) {
            case "active":
                console.log('active',tasks[todoList.id])
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                console.log('complited',tasks[todoList.id])
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                console.log('all',tasks[todoList.id])
                let rr  = tasks
                debugger
                return tasks[todoList.id]
        }
    }


    const todoListComponents = todoList.map(tl => {

            return <Todolist key={tl.id}
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
        }
    )


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListComponents}
        </div>
    );
}



