import React from 'react';
import Task from '../Task';

export default function TaskList({ data, onToggleEditing, onDeleted, onToggleDone, onUpdate }) {
    const tasks = data.map(taskData => {
        return <Task
                    {...taskData}
                    key={ taskData.id }
                    onDeleted={ () => onDeleted(taskData.id) }
                    onToggleEditing={ () => onToggleEditing(taskData.id) }
                    onToggleDone={ () => onToggleDone(taskData.id) }
                    onUpdate={ onUpdate }
                />
    });

    return(
        <ul className="todo-list">
            { tasks }
        </ul>
    );
}
