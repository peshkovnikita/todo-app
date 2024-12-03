import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    taskText: this.props.description,
    time: 0,
    isRunning: false,
    startTime: 0,
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._requestRef);
  }

  _requestRef = null

  startTimer = () => {
    if(this.state.isRunning) return

    this.setState({
      isRunning: true,
      startTime: Date.now() - this.state.time * 1000,
    });
    this._requestRef = requestAnimationFrame(this.tick);
  }

  tick = () => {
    const currentTime = Date.now();

    this.setState({
      time: Math.floor((currentTime - this.state.startTime) / 1000),
    });

    this._requestRef = requestAnimationFrame(this.tick);
  }

  pauseTimer = () => {
    this.setState({ isRunning: false });
    cancelAnimationFrame(this._requestRef);
  }

  onTaskDone = () => {
    this.props.onToggleDone()
    cancelAnimationFrame(this._requestRef);
    this.setState({ isRunning: false, time: 0 })
  }

  deleteHandler = () => {
    this.props.onDeleted()
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

  onEditing = () => {
    if (this.props.isDone) return
    this.props.onToggleEditing()
  }

  render() {
    const { isEditing, description, isDone, creationTime } = this.props
    const { taskText, isRunning, time } = this.state

    const min = Math.floor(time / 60)
    const sec = time - min * 60 === 0 ? 0 : time - min * 60

    let editInput = null
    let doneStyle = null
    let stateStyle = `${isEditing ? 'editing' : ''}`

    if (isEditing) {
      editInput =
          <form onSubmit={this.onSubmit}>
            <input type='text' className='edit' value={taskText} onChange={this.onTaskChange} autoFocus />
          </form>
    }

    if (isDone) {
      stateStyle = 'completed'
      doneStyle = { color: '#cdcdcd', cursor: 'initial' }
    }

    return (
        <li className={stateStyle || null}>
          <div className='view'>
            <input className='toggle' type='checkbox' onClick={this.onTaskDone} defaultChecked={isDone || false} />
            <label>
              <span className='description'>{description}</span>
              <span className='timer' style={doneStyle}>
              {min > 9 ? min : `0${min}`}:{sec > 9 ? sec : `0${sec}`}
            </span>
              <span className='created'>{formatDistanceToNow(creationTime, {
                includeSeconds: true,
                addSuffix: true,
              })}</span>
            </label>
            <button type='button' className='icon icon-edit' onClick={this.onEditing} style={doneStyle} disabled={isDone}/>
            <button type='button' className='icon icon-destroy' onClick={this.deleteHandler} />
            {isRunning ?
                <button type='button' className='icon icon-pause' onClick={this.pauseTimer} style={doneStyle} disabled={isDone}/> :
                <button type='button' className='icon icon-play' onClick={this.startTimer} style={doneStyle} disabled={isDone}/>
            }
          </div>
          {editInput}
        </li>
    )
  }
}

