import { toast } from 'react-hot-toast'
import Input from './Input'
import { useEffect, useRef, useState } from 'react'
import { useTodo } from '../context/useTodo'
import { useAddTodoMutation } from '../slices/userApiSlice'
import { useSelector } from 'react-redux'
const AddTodo = ({refetchData}) => {
    const [input, setInput] = useState("")
    const {addTodo} = useTodo()
    const { userInfo } = useSelector( (state) => state.auth );
    const [createTodo] = useAddTodoMutation()
    const inputRef = useRef(null)
    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus()
        }
    },[])

    const handleSubmission = async(e)=>{
        e.preventDefault()
        if(input.trim()!==''){
          addTodo(input)
          setInput('')
          await createTodo({message:input,userId:userInfo._id})
          refetchData()
          toast.success('Todo added successfully!')
        }else{
          toast.error('Todo field cannot be empty!')
        }
    }

  return (
    <form onSubmit={handleSubmission}>
    <div className="flex items-center w-full max-w-lg gap-2 p-5 m-auto">
      <Input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        type="text"
        className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white"
        placeholder="start typing ..."
      />
      <button
        type="submit"
        className="px-5 py-2 text-sm font-normal text-blue-300 bg-blue-900 border-2 border-blue-900 active:scale-95 rounded-xl"
      >
        Submit
      </button>
    </div>
  </form>
  )
}

export default AddTodo
