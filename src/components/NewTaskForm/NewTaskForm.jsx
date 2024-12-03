import React, { Component } from 'react'

export default class NewTaskForm extends Component {

  state = {
    taskText: '',
  }

  onTaskChange = (e) => {
    this.setState({
      taskText: e.target.value,
    })
  }

  onSubmitTask = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.taskText)

    this.setState({ taskText: '' })
  }

  render() {
    return (
      <header className='header'>
        <h1>todos</h1>
        <form action='' onSubmit={this.onSubmitTask} className='new-todo-form'>
          <input type='text'
                 autoFocus
                 className='new-todo'
                 placeholder='What needs to be done?'
                 value={this.state.taskText}
                 onChange={this.onTaskChange}
          />
        </form>
      </header>
    )
  }
}
