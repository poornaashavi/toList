import React , {useEffect,useRef,useState}  from 'react'

import Todolists from './Todolists'
import todo_icon from '../assets/todo_icon.png'


const todo = () => {


    const [todoList , settodos] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]);

    

    
    const inputRef = useRef()
    const add = ()=>{
        const inputText = inputRef.current.value.trim();
        if(inputText === "")
        {
            return null;
        }
        const newtodo = {
            id : Date.now(),
            text : inputText,
            isComplete : false
        }
        settodos((prev)=>[...prev , newtodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) =>{
        settodos((prevtodos)=>{
            return prevtodos.filter((todo)=>todo.id !== id)
        })
    }

    const toggle = (id)=>{
        settodos((prevtodos) => {
            return prevtodos.map((todo)=>{
                if(todo.id == id)
                {
                    return {...todo , isComplete : !todo.isComplete}
                }
                return todo;
            })
        })
    }


    useEffect(()=>{
        localStorage.setItem("todos" , JSON.stringify(todoList));
        console.log(todoList);
    },[todoList])


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl '>


      <div className='flex items-center mt-7 gap-2'>
        <img className = 'w-10' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold'>ToDo lists</h1>

      </div>


      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your tasks' />
        <button onClick = {add} className='bg-red-500 border-none rounded-full w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add Task</button>
      </div>

    <div>

        {todoList.map((item , index)=>{
            return <Todolists key = {index} text = {item.text} id = {item.id} isComplete = {item.isComplete} deleteTodo = {deleteTodo} toggle = {toggle}/>
        })}


    </div>

    </div>

   
  )
}

export default todo
