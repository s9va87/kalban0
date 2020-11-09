import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Panel from './Panel';
import React, {useState} from 'react'
import {Button} from "reactstrap";
import Modal from './Modal'
import ModalDelete from "./Modal";


const statuses = ['todo', 'progress', 'rewiew', 'done']
const subStatus = ['resorve', 'delete']
const initialTasks = [
    {
        id: 1,
        name: 'First Tasts',
        status: statuses[0],
        priority: 2,
        oldStatus: ''
    },
    {
        id: 2,
        name: 'First Tasts',
        status: statuses[1],
        priority: 2,
        oldStatus: ''
    },
    {
        id: 3,
        name: 'First Tasts',
        status: statuses[2],
        priority: 2
    },
    {
        id: 4,
        name: 'First Tasts',
        status: statuses[3],
        priority: 2,
        oldStatus: '',
    }

]
const initialDelete = [{
    id: 3,
    name: 'First Tasts',
    status: statuses[2],
    priority: 2,
    oldStatus: 'todo'
},
    {
        id: 4,
        name: 'First Tasts',
        status: statuses[3],
        priority: 2,
        oldStatus: 'done'
    }]

function App() {
    const [tasks, setTasks] = useState(initialTasks)

    const [oldTask, setOldTask] = useState(initialDelete)
    const [modal, setModal] = useState(false);
    const [toggle, setToggle] = useState(true)


    const addNewTask = () => {
        const newTask = {
            id: Math.random(),
            name: 'First Tasts',
            status: statuses[Math.floor(Math.random() * 4)],
            priority: 2
        }
        const newTaask = [...tasks, newTask]
        setTasks(newTaask)
    }

    const deleteTask = (taskId, statusOld) => {
        const deleteTasksTo = tasks.filter(el => el.id !== taskId)
        const deleteOld = tasks.filter(el => el.id === taskId)
            .map(el => {
                return {...el, status: subStatus[1], oldStatus: statusOld}
            })
        setTasks(deleteTasksTo)
        const newDelete = [...oldTask, ...deleteOld]
        setOldTask(newDelete)
    }


    const nextPlace = (currentIndex) => {
        console.log(currentIndex)
        return (
            statuses[statuses.indexOf(currentIndex) + 1])
    }

    const prevPlace = (currentIndex) => {

        return (
            statuses[statuses.indexOf(currentIndex) - 1])
    }

    const moveRights = (cardId) => {
        console.log(tasks.find(el => el.id === cardId).status)
        const upgrateTasks = tasks.map(el => el.id === cardId ? {...el, status: nextPlace(el.status)} : el)
        console.log(upgrateTasks.find(el => el.id === cardId).status)
        setTasks(upgrateTasks)

    }

    const moveLeft = (cardId) => {
        const upgrateTasks = tasks.map(el => el.id === cardId ? {...el, status: prevPlace(el.status)} : el)
        setTasks(upgrateTasks)

    }
    const priorChange = (taskId) => {
        const newTasks = tasks.map(el => {
            if (el.id === taskId) return {...el, priority: el.priority + 1};
            return el;
        })
        setTasks(newTasks)
    }
    // const basket = () => {
    //
    // }
    const style = 'row ling-item-start'
    // let done;
    // if (toggle ) {
    //     done = style
    // } else { done = ''}
    // const done = toggle       ? style                 : ''
    let done;
    if (toggle) {
        done = style
    } else {
        done = ''
    }

    const changeStyle = () => {
        setToggle(!toggle)
        console.log(toggle)
    }


    return (
        <div className="container">

            <Button onClick={addNewTask}>Add New Task</Button>
            <button onClick={changeStyle}>style</button>
            <div className={done}>


                {statuses.map(status => (<div key={status} className='col'>
                    <Panel status={status}
                           tasks={tasks}
                           deleteTask={deleteTask}
                           moveRights={moveRights}
                           moveLeft={moveLeft}
                           addNewTask={addNewTask}
                           priorChange={priorChange}


                    />
                    <Modal modal={modal}
                           setModal={setModal}
                          />

                </div>))}
                    <Button color="danger" onClick={()=>setModal(!modal)}>basket</Button>
            </div>

        </div>
    );
}

export default App;
