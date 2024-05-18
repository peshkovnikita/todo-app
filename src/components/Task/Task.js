import React from 'react';

const Task = ({ ...data }) => {
    let editInput = null;
    if(data.itemState === 'editing') {
        editInput = <input type="text" className="edit" value="Editing task"/>;
    }

    return(
        <li className={ data.itemState }>
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span className="description">{ data.description }</span>
                    <span className="created">{ data.creationTime }</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
            { editInput }
        </li>
    );
}

export default Task;