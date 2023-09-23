import { useState, useEffect } from "react";

const API_BASE ="http://localhost:3001"

function App() {

  const [todos , setTodos] =useState([])
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo]=useState("")

  useEffect(()=>{
    getTodos();
    console.log(todos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const getTodos =async()=>{
    console.log('hello')
    await fetch(API_BASE+'/todos')
      .then(res=>res.json())
      .then(data=>setTodos(data))
      .catch(err=>console.error("Error:",err))

  }
  async function handleComplete(id){
    const data = await fetch(API_BASE+'/todos/complete/'+id)
        .then(res=>res.json());
        if(data)
    setTodos(todos=> todos.map(todo=>{
        if(todo._id===data._id){
          todo.complete = data.complete
        }
        return todo;
    }))
  }
  const addTask= async ()=>{
    const data =await fetch(API_BASE+'/todos/new',{
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res=>res.json())
    setTodos([...todos,data])
    setPopupActive(false)
    setNewTodo('')
    console.log(data)
  }

  async function handleDelete(id, event){
    event.stopPropagation();
    const data = await fetch(API_BASE+'/todos/delete/'+id,{
      method:'DELETE'
    }).then(res=>res.json());

    setTodos(todos=>todos.filter(todo=>todo._id!== data._id))
      
  }
  return (
    <div className="App">
      <h1>Welcome, Eyasu</h1>
      <h4>Tasks</h4>
      <div className="todos" >
        {todos.map(todo=>(
            <div 
            className={"todo "+(todo.complete? "is-complete":"") } 
            key={todo._id}
            onClick={()=>handleComplete(todo._id)}
            >
              
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" onClick={(event)=>handleDelete(todo._id, event)}>x</div>
            </div>
        ))}

      </div>
      <div className="addPopup" onClick={()=>setPopupActive(true)}>+</div>
      {popupActive? 
        <div className="popup">
          <div className="closePopup" onClick={()=>setPopupActive(false)}>x</div>
          <div className="content">
            <h3>Add Tasks</h3>
            <input 
              type='text'
              className="add-todo-input"
              onChange={(e)=>setNewTodo(e.target.value)}
              value={newTodo}
            ></input>
            <br></br>
            <button className="create-tasks" onClick={addTask}>Create Tasks</button>
          </div>
        </div>
      :''}
    </div>
  );
}

export default App;
