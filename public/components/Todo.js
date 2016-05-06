import React from 'react'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import $ from 'jquery'

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};

        this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
    }

    loadTasksFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data: data});
                console.log(data);
            },
                error: (xhr, status, err) => {
                    console.error(this.props.url, status, err.toString());
                }
            });
    }

    componentDidMount() {
        this.loadTasksFromServer();
        setInterval(this.loadTasksFromServer.bind(this), this.props.pollInterval);
    }

    handleTaskSubmit(task) {
        const tasks = this.state.data;
        const newTasks = tasks.concat([task]);
        this.setState({data: newTasks});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: task,
            success: (data) => {this.setState({data});},
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    handleTaskFinished(finishedTask) {
        const tasks = this.state.data;
        for (var task of tasks) {
            if(task['taskName'] === finishedTask['taskName']) {
                task['isFinished'] = true;
                break;
            }
        }
        this.setState({data: tasks});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'PUT',
            data: finishedTask,
            success: (data) => {this.setState({data});},
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    render() {
        return (
            <div className='todo'>
            <TaskForm onTaskSubmint={this.handleTaskSubmit.bind(this)} />
            <TaskList data={this.state.data} onTaskFinished={this.handleTaskFinished.bind(this)} />
            </div>
            );
    }

}
