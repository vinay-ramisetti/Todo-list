import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
// import { CiEdit } from "react-icons/ci";
// import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  // click and id are passed into the function first.
  // t is the element that you want edit.
  // Add remaining elements into the newTodos without that edited one.
  // Add the newTodos to the setTodos.
  // That t will come on setTodo(on the save bar) , so you can edit that and save.
  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    setTodo(t[0].todo)
    saveToLS()
  }
  
  // Rerenders all the todos again except the todo that got deleted.
  // Push the all elements into the newTodos except the element of the id.
  // set that newTodos to the setTodos.
  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  // initially for the todo that wanted to be added , give the id and give isCompleted as false.
  //Add them to Todos simultaneously
  // And make the todo bar empty.
  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  // This is for changing the value in the input.
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

   //This function is to change the isCompleted value.
   //It's important to find the index because we only know the id(0) of the component.
   // [id , todo, iscomplete] is a array .
   // findIndex is used to find the first element which satifies the condition.
   // we can't change the isComplete directly from the todos, first push the todos into the newTodos and then change the isCompleted from the newTodos.
   //Then put the newTodos into the setTodos.
  const handleCheckbox = (e,id) => { 
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    < >
    <Navbar/> 
       <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[80vh] md:w-[35%]">
        {/* Headings */}
        <h1 className='font-bold text-center text-3xl'>MY TASKS MANAGAR</h1>
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>

       {/* These are for add todos . */}
          <div className="flex">
          <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=0} className='bg-blue-700 mx-2 rounded-full hover:bg-violet-700 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>

         </div>

      {/* check box for the show all options... */}
         <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show all</label> 


      {/* This for the black line */}
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

      {/* Heading for Your Todos */}
         <h2 className='text-2xl font-bold'>Your Todos</h2>

      
         <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
          {todos.map(item=>{


        // if showFinished is true then it directly enters into the statements and print all the todos.
        // if showFinished is false then if prints the elements which are not completed (or) elements with iscompleted as false.
          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>

          {/* Display of the Todo with the checkbox */}
            <div className='flex gap-5'> 
            <input onChange={(e)=>handleCheckbox(e,item.id)} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>

           {/* Buttons for Edit and Delete */}
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-blue-700 hover:bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit </button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-blue-700 hover:bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
            </div> 


          </div>
          })}
         </div>
        
       </div>
    </>
  )
}

export default App