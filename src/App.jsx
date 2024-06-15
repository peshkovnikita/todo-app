import React, { Component } from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from "./components/Footer";
import AddButton from "./components/AddButton";

export default class App extends Component {
    state = {
        taskData: [],
        filter: 'all',
    }

    createTask(description) {
        return {
            description,
            isEditing: false,
            isDone: false,
            creationTime: Date.now(),
            id: Date.now() + Number(Math.random().toFixed(4)),
        }
    }

    deleteItem = (id) => {
        this.setState((prevState) => {
            const index = prevState.taskData.findIndex((item) => item.id === id);
            const newTaskData = prevState.taskData.toSpliced(index, 1);

            return { taskData: newTaskData }
        })
    }

    addItem = (text) => {
        const newTask = this.createTask(text);

        this.setState((prevState) => {
            const newTaskList = [...prevState.taskData.slice(), newTask];
            return { taskData: newTaskList }
        })
    }

    onToggleEditing = (id) => {
        this.setState(({ taskData }) => {
            const index = taskData.findIndex((item) => item.id === id);
            const taskForEditing = taskData[index];
            const newTaskState = {...taskForEditing, isEditing: !taskForEditing.isEditing};

            return { taskData:  taskData.toSpliced(index, 1, newTaskState) };

        })
    }

    onUpdate = (id, text) => {
        this.setState(({ taskData }) => {
            const index = taskData.findIndex((item) => item.id === id);
            const editedTask = taskData[index];
            const newTaskDesc = {...editedTask, description: text}

            return { taskData:  taskData.toSpliced(index, 1, newTaskDesc) };
        })
    }

    onToggleDone = (id) => {
        this.setState(({ taskData }) => {
            const index = taskData.findIndex((item) => item.id === id);
            const oldTask = taskData[index];
            const newTask = {...oldTask, isDone: !oldTask.isDone};

            return { taskData:  taskData.toSpliced(index, 1, newTask) };
        })
    }

    onToggleFilter = (filterState) => {
        this.setState({ filter: filterState });
    }

    clearAllCompleted = () => {
        this.setState(({ taskData }) => {
            const uncompletedTasks = taskData.filter(item => item.isDone === false)

            return { taskData: uncompletedTasks }
        })
    }

    render() {
        const { taskData, filter } = this.state;
        const activeTasks = taskData.filter((el) => !el.isDone);
        const completedTasks = taskData.filter((el) => el.isDone);
        const tasksLeft = taskData.length - completedTasks.length;

        return (
            <>
                <section className='todoapp'>
                    <AddButton onItemAdded={ this.addItem }/>
                    <NewTaskForm onItemAdded={ this.addItem }/>
                    <section className='main'>
                        <TaskList
                            data={ filter === 'all' ? taskData :
                                   filter === 'active' ? activeTasks : completedTasks
                            }
                            onToggleEditing={ this.onToggleEditing }
                            onToggleDone={ this.onToggleDone }
                            onDeleted={ this.deleteItem }
                            onUpdate={ this.onUpdate }
                        />
                        <Footer
                            data={ taskData }
                            tasksToDo={ tasksLeft }
                            filterState={ filter }
                            onToggleFilter={ this.onToggleFilter }
                            onClearCompleted={ this.clearAllCompleted }
                        />
                    </section>
                </section>
                <button onClick={ () => console.table(taskData) } className={'btn-add'} type={'button'}>
                    Check State
                </button>
            </>
        );
    }
}
