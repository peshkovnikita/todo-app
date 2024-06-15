import React, {Component} from 'react';

import './AddButton.css';

export default class AddButton extends Component {
    render() {
        return (
            <div className='btn-add__container'>
                <button className='btn-add'
                        type='button'
                        onClick={ () => this.props.onItemAdded( (() => Math.random().toString(36).slice(2))()) }
                >
                    Add random task
                </button>
            </div>
        )
    }
}