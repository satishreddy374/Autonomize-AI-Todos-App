import React, { useState } from 'react';
import "./index.css"
import { v4 as uuidv4 } from 'uuid';

import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

let todoRepeatCount;
let todoText = "";
let list = []

const Todos = () => {

    const [data, setData] = useState("")
    const [todosList, setTodosList] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [editedQuantity, setEditedQuantity] = useState(0);


    const onChangeTodo = (event) => {
        setData(event.target.value)
    }

    // Add Todo Item....
    const addTodoItem = (todoText, todoRepeatCount) => {
        
        for (let i=0; i<todoRepeatCount; i++) {
            const todoItem = {
                id: uuidv4(),
                todoText: todoText,
                quantity: 0
            }
            list.push(todoItem)
            setTodosList(list)
        }
        
    }


    // Delete Todo Item...
    const onUpdateTodosList = (id) => {
        const getUpdatedTodosList = todosList.filter((todoItem) => {
            return todoItem.id !== id
        })
        setTodosList(getUpdatedTodosList)
    }

    const onClickAddTodoButton = () => {
        const inputValue = data.split(" ")
        todoRepeatCount = inputValue[inputValue.length - 1]
        let todoArray = inputValue.slice(0, inputValue.length - 1)
        
        for (let item of todoArray) {
            todoText += item + " "
        }

        addTodoItem(todoText, todoRepeatCount)
        setData("")
        todoText = ""
    }

    
    const handleEdit = (id, todoText, quantity) => {
        setEditingId(id);
        setEditedText(todoText);
        setEditedQuantity(quantity);
    };

    const onClickSaveButton = () => {
        const updatedTodos = todosList.map(todo => {
            if (todo.id === editingId) {
                return { ...todo, todoText: editedText, quantity: editedQuantity };
            }
            return todo;
        });
        setTodosList(updatedTodos);
        setEditingId(null);
    };

    return (


        <div className="todos-app-container">
            <center>
            <h1 className="heading">Day Goals!</h1>
            </center>
            <input value={data} type="text" onChange={onChangeTodo} className="input-element" placeholder="Add a Todo Item..." />
            <button className="add-todo-button" onClick={onClickAddTodoButton}>Add Todo</button>


            <ul className="todo-list-container">
                {todosList.map(todo => (
                    <li key={todo.id} className="todo-item-container">
                        {editingId === todo.id ? (
                            <div className="input-ele-save-btn-container">
                                <input
                                    className="input-ele"
                                    type="text"
                                    value={editedText}
                                    onChange={event => setEditedText(event.target.value)}
                                />
                                <input
                                    type="number"
                                    className="input-ele"
                                    value={editedQuantity}
                                    onChange={event => setEditedQuantity(parseInt(event.target.value))}
                                />
                                <button className="save-button" onClick={onClickSaveButton}>Save</button>
                            </div>
                        ) : (
                            <>
                                <span className="todo-text">{todo.todoText}</span>
                                <span className="updated-todo-count">(Updated: {todo.quantity} Times)</span>
                                <button className="edit-button" onClick={() => handleEdit(todo.id, todo.todoText, todo.quantity)}>
                                    <CiEdit size="35" color="white" />
                                </button>
                                <button className="cross-button" onClick={() => onUpdateTodosList(todo.id)}>
                                    <RxCross2 size="30" color="red" />
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        
        
        </div>

    );
};

export default Todos;


