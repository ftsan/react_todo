import React from 'react'
import Task from './Task'

export default class TaskList extends React.Component {

    constructor(props) {
        super(props);
    }

    onTaskFinished(task) {
        this.onTaskFinished(task)
    }

    render() {
        console.log(this.props.data);
        var taskNodes = this.props.data.filter((task) => {
                return task.isFinished === false;
            }).map((task) => {
            return (<Task taskName={task.taskName} isFinished={task.isFinished} onTaskFinished={this.props.onTaskFinished.bind(this)} />);
        });
        return (
            <div className='taskList'>{taskNodes}</div>
        );
    }
}
