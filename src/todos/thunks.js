import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure, createTodo, removeTodo, markAsCompletedTodo } from "./actions.js";

export const loadTodos = () => async (dispatch, getState) =>{
    try{
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();
        dispatch(loadTodosSuccess(todos));
    } catch(error){
        dispatch(loadTodosFailure());
        dispatch(displayAlert(error));
    }
}

export const addTodoRequest = text => async dispatch =>{
    try{
        const body = JSON.stringify({ text })
        const response = await fetch('http://localhost:8080/todos', {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'post',
            body,
        })
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch(error){
        dispatch(displayAlert(error));
    }
    
}

export const removeTodoRequest = id => async dispatch =>{
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete'
        })
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo))
    } catch(error){
        dispatch(displayAlert(error));
    }
}

export const completedTodoRequest = id => async dispatch =>{
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}/Completed`, {
            method: 'post'
        })
        const completedTodo = await response.json();
        dispatch(markAsCompletedTodo(completedTodo))
    } catch(error){
        dispatch(displayAlert(error));
    }
}

export const displayAlert = text => () =>{
    alert(text)
}; 

