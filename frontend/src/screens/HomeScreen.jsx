import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useState } from "react";
import { ToastContainer } from "react-bootstrap";


const HomeScreen = () => {
  const [refetch,setRefetch] = useState(false)

  const refetchData = () =>{
    setRefetch(!refetch)
  }
  return (
    <>
      <ToastContainer/>
      <AddTodo refetchData={refetchData} />
      <TodoList refetch={refetch} refetchData={refetchData} />
    </>
  );
};

export default HomeScreen 
