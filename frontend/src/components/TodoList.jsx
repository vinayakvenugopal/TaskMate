import TodoItem from './TodoItem'
import { useTodo } from '../context/useTodo'
import { SiStarship } from 'react-icons/si'
import { motion } from 'framer-motion'
import { useGetTodoMutation } from '../slices/userApiSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const TodoList = ({refetch,refetchData}) => {
  const [getTodo] = useGetTodoMutation()
  const { userInfo } = useSelector( (state) => state.auth );
  const [todos,setTodos] = useState([])
  console.log(todos);

  useEffect(()=>{
    try {
      const fetchData = async()=>{
        const res = await getTodo({userId:userInfo._id})
        setTodos(res.data)
      }
      fetchData()             
    } catch (error) {
      
    }
  },[refetch])
  // const { todos } = useTodo()
  if (!todos.length) {
    return (
      <div className="max-w-lg px-5 m-auto">
        <h1 className="flex flex-col items-center gap-5 px-5 py-10 text-xl font-bold text-center rounded-xl bg-zinc-900">
          <SiStarship className="text-5xl" />
          You have nothing to do!
        </h1>
      </div>
    ) 
  }
  return (
    <motion.ul className="grid max-w-lg gap-2 px-5 m-auto">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} refetchData={refetchData} />
      ))}
    </motion.ul>
  )

 
}

export default TodoList
