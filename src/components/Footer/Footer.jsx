import React from 'react'
import TasksFilter from '../TasksFilter'

export default function Footer({ tasksToDo = 0, onClearCompleted, onToggleFilter, filterState }) {
  return (
    <footer className='footer'>
      <span className='todo-count'>{`${tasksToDo} tasks left`}</span>
      <TasksFilter filterState={filterState} onToggleFilter={onToggleFilter} />
      <button type='button' className='clear-completed' onClick={onClearCompleted}>Clear completed</button>
    </footer>
  )
}
