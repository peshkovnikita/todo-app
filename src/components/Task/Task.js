import React from 'react';

export default class Task extends React.Component {
    render() {
        const { itemState: state, description, creationTime } = this.props;
        let editInput = null;

        if(state === 'editing') {
            editInput = <input type="text" className="edit" value="Editing task"/>;
        }

        return(
            <li className={ state } >
                <div className="view">
                    <input className="toggle" type="checkbox"/>
                    <label>
                        <span className="description">{ description }</span>
                        <span className="created">{ creationTime }</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
                { editInput }
            </li>
        );
    }
}

