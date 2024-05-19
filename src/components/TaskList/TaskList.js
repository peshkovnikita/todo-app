import React from 'react';
import Task from '../Task';

export default function TaskList({ data }) {
    const tasks = data.map(taskData => {
       return <Task {...taskData} key={taskData.id}/>
    });

    return(
        <ul className="todo-list">
            { tasks };
        </ul>
    );
}
