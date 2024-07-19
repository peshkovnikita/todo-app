import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    taskText: this.props.description,
    isPlaying: this.props.isPlaying,
  }

  onTaskChange = (e) => {
    this.setState({
      taskText: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { id, onToggleEditing, onUpdate } = this.props
    const { taskText } = this.state
    if (taskText.trim()) {
      onToggleEditing()
      onUpdate(id, taskText)
    }
  }

  startTimer = () => {
    if (this.props.isDone) return
    this.interval = setInterval(() => this.tick(), 1000)
    this.setState({ isPlaying: true })
    this.props.onTogglePlaying(this.props.id, this.props.isPlaying)
  }

  tick() {
    const { id, updateTimer } = this.props
    updateTimer(id)
  }

  pauseTimer = () => {
    clearInterval(this.interval)
    this.setState({ isPlaying: false })
    this.props.onTogglePlaying(this.props.id, this.props.isPlaying)
  }

  onTaskDone = () => {
    this.props.onToggleDone()
    if (this.props.isPlaying) {
      clearInterval(this.interval)
      this.setState({ isPlaying: false })
      this.props.onTogglePlaying(this.props.id, this.props.isPlaying)
    }
  }

  deleteHandler = () => {
    this.pauseTimer()
    this.props.onDeleted()
  }

  onEditing = () => {
    if (this.props.isDone) return
    this.props.onToggleEditing()
  }

  render() {
    const { isEditing, description, isDone, creationTime } = this.props

    const { h: hours, m: minutes, s: seconds } = this.props.timer
    let editInput = null
    let doneStyle = null
    let stateStyle = `${isEditing ? 'editing' : ''}`

    if (isEditing) {
      editInput =
        <form onSubmit={this.onSubmit}>
          <input type='text' className='edit' value={this.state.taskText} onChange={this.onTaskChange} autoFocus />
        </form>
    }

    if (isDone) {
      stateStyle = 'completed'
      doneStyle = { color: '#cdcdcd' }
    }

    return (
      <li className={stateStyle || null}>
        <div className='view'>
          <input className='toggle' type='checkbox' onClick={this.onTaskDone} defaultChecked={isDone || false} />
          <label>
            <span className='description'>{description}</span>
            <span className='timer' style={doneStyle}>
              {hours}:{minutes}:{seconds}
            </span>
            <span className='created'>{formatDistanceToNow(creationTime, {
              includeSeconds: true,
              addSuffix: true,
            })}</span>
          </label>
          <button type='button' className='icon icon-edit' onClick={this.onEditing} style={doneStyle} />
          <button type='button' className='icon icon-destroy' onClick={this.deleteHandler} />
          {this.state.isPlaying ?
            <button type='button' className='icon icon-pause' onClick={this.pauseTimer} style={doneStyle} /> :
            <button type='button' className='icon icon-play' onClick={this.startTimer} style={doneStyle} />
          }
        </div>
        {editInput}
      </li>
    )
  }
}

