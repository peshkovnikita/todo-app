import React, { Component } from 'react'
// import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    taskText: this.props.description,
    isPlaying: false,
    seconds: '00',
    minutes: '00',
    hours: '00',
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

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startTimer = () => {
    if (this.props.isDone) return
    this.interval = setInterval(() => this.tick(), 1000)
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }))
  }

  tick() {
    this.setState(prevState => {
      if (prevState.minutes === '59' && prevState.seconds === '59') {
        return { hours: this.incrementValue(prevState.hours), minutes: '00', seconds: '00' }
      }
      if (prevState.seconds === '59') {
        return { minutes: this.incrementValue(prevState.minutes), seconds: '00' }
      }
      return { seconds: this.incrementValue(prevState.seconds) }
    })
  }

  incrementValue(str) {
    const num = Number(str) + 1
    if (num < 10) return `0${num}`
    return `${num}`
  }

  onTaskDone = () => {
    this.props.onToggleDone()
    clearInterval(this.interval)
    this.setState(prevState => ({
      isPlaying: !!prevState.isPlaying,
      seconds: '00',
      minutes: '00',
      hours: '00',
    }))
  }

  pauseTimer = () => {
    clearInterval(this.interval)
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }))
  }

  render() {
    const { isEditing, description, isDone, onDeleted, onToggleEditing } = this.props
    const { seconds, minutes, hours } = this.state
    let editInput = null
    let stateStyle = `${isEditing ? 'editing' : ''}`
    const doneStyle = isDone ? { color: '#cdcdcd' } : null

    if (isEditing) {
      editInput =
        <form onSubmit={this.onSubmit}>
          <input type='text' className='edit' value={this.state.taskText} onChange={this.onTaskChange} autoFocus />
        </form>
    }

    if (isDone) {
      stateStyle = 'completed'
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
            {/* <span className='created'>{formatDistanceToNow(creationTime, { */}
            {/*   includeSeconds: true, */}
            {/*   addSuffix: true, */}
            {/* })}</span> */}
          </label>
          <button type='button' className='icon icon-edit' onClick={onToggleEditing} />
          <button type='button' className='icon icon-destroy' onClick={onDeleted} />
          {this.state.isPlaying ?
            <button type='button' className='icon icon-pause' onClick={this.pauseTimer} /> :
            <button type='button' className='icon icon-play' onClick={this.startTimer} />
          }
        </div>
        {editInput}
      </li>
    )
  }
}

