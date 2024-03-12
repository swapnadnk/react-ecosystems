import React, {useEffect} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TodoListItem from "./TodoListItem.js";
import { loadTodos, removeTodoRequest, completedTodoRequest } from "./thunks.js";
import NewTodoForm from "./NewTodoForm.js";
import { getTodosLoading, getCompletedTodos, getInCompleteTodos } from "./selectors.js";

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({completedTodos, inCompletedTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(()=>{
        startLoadingTodos()
    }, [])
    const loadingMessage = "Loading todos...";
    const content = (
        <ListWrapper>
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
        </ListWrapper>);
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