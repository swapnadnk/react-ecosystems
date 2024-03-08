import React, {useEffect} from "react";
import { connect } from "react-redux";
import { removeTodo, markAsCompletedTodo } from "./actions";
import TodoListItem from "./TodoListItem";
import { loadTodos } from "./thunks";
import NewTodoForm from "./NewTodoForm";
import './TodoList.css';

const TodoList = ({todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(()=>{
        startLoadingTodos()
    }, [])
    const loadingMessage = "Loading todos...";
    const content = (
        <div className="list-wrapper">
                <NewTodoForm/>
                {todos.map((todo, index)=> <TodoListItem 
                key={index}
                todo={todo} 
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}/>)}
        </div>);
    return isLoading? loadingMessage : content
}

const mapStateToProps = state =>({
    isLoading: state.isLoading,
    todos: state.todos,
});

const mapDispatchToProps = dispatch =>({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markAsCompletedTodo(text))

});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);