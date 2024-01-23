import React, { Component } from 'react'

const Tbody = (props) => {
    const { tasks, removeItem } = props;
    const rows = tasks.map((task, index) => {
        return (
            <tr key={index}>
                <td>{task}</td>
                <td>
                    <span className='remove-icon' onClick={() => removeItem(index)}> X </span>{" "}
                </td>
            </tr>
        );
    });
    return <tbody> {rows} </tbody>;
};

export default class TodoList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='todo_table'>
                <table>
                    <thead>
                        <tr>
                            <td colSpan={2}><h2>TODO List</h2></td>
                        </tr>
                    </thead>
                    <Tbody tasks={this.props.tasks} removeItem={(index) => this.props.removeItem(index)} />
                </table>
            </div>
        )
    }
}
