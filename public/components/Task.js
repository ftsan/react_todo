import React from 'react'
import Marked from 'marked'
import ReactDOM from 'react-dom'

export default class Task extends React.Component {
    render() {
        // var rawMarkup = Marked(this.props.taskName.toString(), {sanitize: true});
        return (
            <div className="task">
                <input type="checkbox" name="isFinished" checked={this.props.isFinished} onChange={this.handleCheck.bind(this) } />
                {//<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
                }
                <span className="taskName" ref="taskName">
                    {this.props.taskName}
                </span>
            </div>
        );
    }

    handleCheck(e) {
        console.log(ReactDOM.findDOMNode(this.refs.taskName));
        const taskName = this.props.taskName;
        this.props.onTaskFinished({taskName: taskName, isFinished: true});
        return;
    }
}