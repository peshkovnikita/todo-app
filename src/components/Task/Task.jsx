import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    taskText: this.props.description,
  }

  onTaskChange = (e) => {
    this.setState({
      taskText: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { id, onToggleEditing, onUpdate } = this.props
    onToggleEditing()
    onUpdate(id, this.state.taskText)
  }

  render() {
    const { isEditing, creationTime, description, isDone, onDeleted, onToggleEditing, onToggleDone } = this.props
    let editInput = null
    let stateStyle = `${isEditing ? 'editing' : ''}`

    if (isEditing) {
      editInput = <form onSubmit={this.onSubmit}>
        <input type='text' className='edit' value={this.state.taskText} onChange={this.onTaskChange} />
      </form>
    }

    if (isDone) {
      stateStyle = 'completed'
    }

    return (
      <li className={stateStyle || null}>
        <div className='view'>
          <input className='toggle' type='checkbox' onClick={onToggleDone} defaultChecked={isDone || false} />
          <label>
            <span className='description'>{description}</span>
            <span className='created'>{formatDistanceToNow(creationTime, {
              includeSeconds: true,
              addSuffix: true,
            })}</span>
          </label>
          <button type='button' className='icon icon-edit' onClick={onToggleEditing} />
          <button type='button' className='icon icon-destroy' onClick={onDeleted} />
        </div>
        {editInput}
      </li>
    )
  }
}

