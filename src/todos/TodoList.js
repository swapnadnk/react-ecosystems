import React, {useEffect} from "react";
import { connect } from "react-redux";
import TodoListItem from "./TodoListItem";
import { loadTodos, removeTodoRequest, completedTodoRequest } from "./thunks";
import NewTodoForm from "./NewTodoForm";
import { getTodos, getTodosLoading, getCompletedTodos, getInCompleteTodos } from "./selectors";
import './TodoList.css';

const TodoList = ({completedTodos, inCompletedTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(()=>{
        startLoadingTodos()
    }, [])
    const loadingMessage = "Loading todos...";
    const content = (
        <div className="list-wrapper">
                <NewTodoForm/>
                <h3>Incompleted:</h3>
                {inCompletedTodos.map((todo, index)=> <TodoListItem 
                key={index}
                todo={todo} 
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}/>)}
                <h3>Completed:</h3>
                {completedTodos.map((todo, index)=> <TodoListItem 
                key={index}
                todo={todo} 
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}/>)}
        </div>);
    return isLoading? loadingMessage : content
}

const mapStateToProps = state =>({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    inCompletedTodos: getInCompleteTodos(state),
});

const mapDispatchToProps = dispatch =>({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(completedTodoRequest(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);