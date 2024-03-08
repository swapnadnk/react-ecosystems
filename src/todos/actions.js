export const CREATE_TODO = 'CREATE_TODO';

export const createTodo = text => ({
    type: CREATE_TODO,
    payload: { text }
});

export const REMOVE_TODO = 'REMOVE_TODO';

export const removeTodo = text =>({
    type: REMOVE_TODO,
    payload: { text },
})

export const MARK_AS_COMPLETED_TODO = 'MARK_AS_COMPLETED_TODO';

export const markAsCompletedTodo = text =>({
    type: MARK_AS_COMPLETED_TODO,
    payload: { text }
})