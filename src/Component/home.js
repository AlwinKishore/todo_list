import React, { Component } from 'react'
import axios from 'axios';
import TodoList from './TodoList';

export default class Home extends Component {
    constructor() {
        super();
        this.state = { tasks: [], new_task: '' }
    }

    componentDidMount() {
        this.get_users();
    }

    get_users = () => {
        localStorage.getItem('task') == null ?
            axios.get('https://dummyjson.com/users')
                .then((response) => {
                    let users = response.data.users.map((user, index) => {
                        return user.firstName
                    }).slice(0, 10);
                    this.setState({ tasks: users }, () => localStorage.setItem('task', this.state.tasks))
                })
            :
            this.setState({ tasks: localStorage.getItem('task').split(',') })
    }

    input_task = (e) => {
        if (e.target.value != '') {
            this.setState({ new_task: e.target.value })
        }
    }

    add_task = () => {
        if (this.state.new_task != '') {
            this.state.tasks.push(this.state.new_task);
            localStorage.setItem('task', this.state.tasks)
            this.setState({ new_task: '' })
        }
    }

    removeItem = (index) => {
        this.setState({
            tasks: this.state.tasks.filter((task, i) => {
                return index != i;
            })
        }, () => localStorage.setItem('task', this.state.tasks))
    }

    render() {
        return (
            <div>
                <div className="row todo_body bg-light">
                    <div className="col-12 user_input">
                        <h2>TODO APP</h2>
                        <input type='text' className='task' name='task' placeholder='Enter the task' value={this.state.new_task} onChange={(e) => this.input_task(e)} /> &nbsp;
                        <button onClick={() => this.add_task()} >Add</button>
                    </div>
                    <div className="col-12">
                        <TodoList tasks={this.state.tasks} removeItem={(index) => this.removeItem(index)} />
                    </div>
                </div>
            </div>
        )
    }
}
