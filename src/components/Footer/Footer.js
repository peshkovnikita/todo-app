import React, {Component} from 'react';
import TasksFilter from '../TasksFilter';
import PropTypes from "prop-types";

export default class Footer extends Component {

    static defaultProps = {
        tasksToDo: 0
    }

    static propTypes = {
        tasksToDo: PropTypes.number
    }

    render() {
        const { tasksToDo, onClearCompleted, onToggleFilter, filterState } = this.props;
        return(
            <footer className='footer'>
                <span className='todo-count'>{`${ tasksToDo } items left`}</span>
                <TasksFilter filterState={ filterState } onToggleFilter={ onToggleFilter }/>
                <button className='clear-completed' onClick={ onClearCompleted }>Clear completed</button>
            </footer>
        );
    }
}


