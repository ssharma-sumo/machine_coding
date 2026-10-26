import React from 'react';
import './editableTodos.css'


const TodoItem = (props) => {
    const { title, updateComplete, updateDelete, id, isCompleted } = props;
    return (
        <div className='todo-item'>
            <div className={`complete-marker ${isCompleted ? 'completed' : ''}`} onClick={() => { updateComplete(id) }}>
            </div>
            <div className={`title ${isCompleted ? 'completed-text' : ''}`}>
                {title}
            </div>
            <div className='delete' onClick={() => { updateDelete(id) }}>
                X
            </div>

        </div>
    )
 }


export const EditableTodos = () => { 
    const [todos, setTodos] = React.useState([]);
    const inputRef = React.useRef();
    const onKeyDown = React.useCallback((e) => { 
        if (e.key === 'Enter') {

            const text = e.target.value.trim();

            setTodos(prev => { 
                const newItem = {
                    id: Date.now(),
                    title: text,
                    isCompleted: false,
                    isDeleted: false
                }

                return [...prev, newItem]
            })

            e.target.value = '';
        }
    }, [])
    

    const updateComplete = React.useCallback((id) => { 
        setTodos(prev => {
            prev.forEach(todo => { 
                if (todo.id === id) {
                    todo.isCompleted = true;
                }
            })
            return [...prev]
         })
    }, [])
    
    const updateDelete = React.useCallback((id) => { 
        setTodos(prev => { 
            prev.forEach(todo => { 
                if (todo.id === id) { 
                    todo.isDeleted = true;
                }
            })
            return [...prev];
        })
    }, [])
    
    const itemToRender = React.useMemo(() => { 
        return todos.filter(todo=>!todo.isDeleted)
    },[todos]) 

    return (
        <div className="editable-todos-container">
            <input type="text" onKeyDown={onKeyDown} ref={inputRef} />
            {itemToRender.map(todo => (
                <TodoItem
                    id={todo.id}
                    title={todo.title}
                    updateComplete={updateComplete}
                    updateDelete={updateDelete}
                    isCompleted={todo.isCompleted}
                />
             )) }
        </div>
    )
}