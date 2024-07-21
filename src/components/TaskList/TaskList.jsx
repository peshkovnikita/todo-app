import React from 'react'
import Task from '../Task'

export default function TaskList({
  data,
  onToggleEditing,
  onDeleted,
  onToggleDone,
  onUpdate,
  onUpdateTimer
}) {
  const tasks = data.map(taskData => <Task
    {...taskData}
    key={taskData.id}
    onDeleted={() => onDeleted(taskData.id)}
    onToggleEditing={() => onToggleEditing(taskData.id)}
    onToggleDone={() => onToggleDone(taskData.id)}
    onUpdate={onUpdate}
    updateTimer={onUpdateTimer}
  />)

  return (
    <ul className='todo-list'>
      {tasks}
    </ul>
  )
}
