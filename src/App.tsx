import React, {useState} from 'react'
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML$CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ]);

    function removeTasks(id: string) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    function addTask(title: string) {
        let task: TaskType = {id: v1(), title: title, isDone: false};
        let newTask = [task, ...tasks];
        setTasks(newTask);
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function getTasksForTodolist() {
        switch (filter) {
            case"active":
                return tasks.filter(t => t.isDone === false);
            case "completed":
                return tasks.filter(t => t.isDone === true);
            default:
                return tasks
        }
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean) {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t))
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="What to learn?"
                      tasks={getTasksForTodolist()}
                      filter={filter}
                      removeTask={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
