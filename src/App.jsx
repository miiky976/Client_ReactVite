import { useEffect, useState } from 'react'
import { Task } from './assets/task'

const url = import.meta.env.VITE_SERVER+"/tasks"

function App() {
    const [tasks, setTasks] = useState([])

    const [task, setTask] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(
        () => {
            update()
        }, []
    )
    const update = async () => {
        const fetchdata = async () => {
            const result = await fetch(url)
            const json = await result.json()
            setTasks(json)
        }
        fetchdata()
    }

    const handleTask = (event) => {
        setTask(event.target.value)
    }
    const handleDesc = (event) => {
        setDesc(event.target.value)
    }

    const btnAdd = () => {
        fetch(import.meta.env.VITE_SERVER+"/task", {
            method: "POST",
            body: JSON.stringify({
                title: task,
                desc: desc
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => response.json)
        .then(json => console.log(json))
        update()
    }

    return (
        <div className='m-2'>
            <h1>Lista de tareas</h1>
            <div className='flex flex-row items-center my-2'>
                <input onChange={handleTask} className='bg-grey-200 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-2' type="text" name="" id="" />
                <input onChange={handleDesc} className='bg-grey-200 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" name="" id="" />
                <button onClick={btnAdd} className='bg-gray-800 text-gray-200 p-2 ml-2 rounded-lg'>Agregar</button>
            </div>
            <div className='bg-blue-200 p-2 rounded-lg'>
            {tasks.map((task) => (
                <Task id={task.ID} title={task.title} desc={task.desc} stat={task.stat}></Task>
            ))}
            </div>
        </div>
    )
}

export default App
