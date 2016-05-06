import React from 'react'
import ReactDOM from 'react-dom'

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
        const taskName = ReactDOM.findDOMNode(this.refs.taskName).value.trim();
        if (!taskName) {
            return;
        }
        this.props.onTaskSubmint({taskName: taskName, isFinished: false});
        ReactDOM.findDOMNode(this.refs.taskName).value = '';
        return;
    }

    render() {
        return (
            <form className="taskForm" onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="Your new task" ref="taskName" />
                <input type="submit" value="Post" />
            </form>
        );
    }
}
