import React, { createContext, useState } from 'react'
import { nanoid } from 'nanoid'


export const TodoContext = createContext(
  undefined,
)

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    const newTodo = {
      id: nanoid(),
      text,
      status: 'undone',
    }
    setTodos([...todos, newTodo])
  }
 const deleteTodo = (id) => {
  setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
}

const editTodo = (id, text) => {
  setTodos(prevTodos => {
    return prevTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text }
      }
      return todo
    })
  })
}

const updateTodoStatus = (id) => {
  setTodos(prevTodos => {
    return prevTodos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === 'undone' ? 'completed' : 'undone',
        }
      }
      return todo
    })
  })
}


  const value = {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    updateTodoStatus,
  }

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  )
}    