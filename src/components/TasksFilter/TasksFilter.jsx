import React, { Component } from 'react'

export default class TasksFilter extends Component {

  state = {
    filter: 'all',
  }

  onFilter = (e) => {
    const filterState = e.target.getAttribute('value')
    this.props.onToggleFilter(filterState)

    this.setState({ filter: filterState })
  }

  render() {
    const { filter } = this.state
    return (
      <ul className='filters'>
        <li>
          <button type='button'
                  value='all'
                  className={filter === 'all' ? 'selected' : null}
                  onClick={this.onFilter}>
            All
          </button>
        </li>
        <li>
          <button
            type='button'
            value='active'
            className={filter === 'active' ? 'selected' : null}
            onClick={this.onFilter}>
            Active
          </button>
        </li>
        <li>
          <button
            type='button'
            value='completed'
            className={filter === 'completed' ? 'selected' : null}
            onClick={this.onFilter}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
