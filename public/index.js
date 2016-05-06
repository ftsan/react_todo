import React from 'react'
import ReactDOM from "react-dom";
import Todo from './components/TODO'

ReactDOM.render(
    <Todo url={"http://localhost:8080/api/todo"} pollInterval={10000} />,
    document.getElementById('container')
);
