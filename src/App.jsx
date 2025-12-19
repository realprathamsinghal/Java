import './App.css';
import { useState, useEffect } from 'react';

function Button({ label }) {
  return <button>{label}</button>;
}

function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setLikes(likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <button 
      onClick={handleClick} 
      style={{ backgroundColor: isLiked ? 'gold' : 'white' }}
    >
      Likes: {likes}
    </button>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("Fetching data from server...");
    fetch('http://localhost:3000/api/todos')
      .then(res => res.json())
      .then(data => {
        console.log("Data received:", data);
        setTodos(data);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  const addTodo = async () => {
    if (!inputValue.trim()) return; // Don't add empty todos
    const todoData = { text: inputValue.trim(), completed: false };
    // 1. Create the data object

    try {
      // 2. Send POST request to server
      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell server we are sending JSON
        },
        body: JSON.stringify(todoData), // Convert JS object to JSON string
      });

      // 3. Get the saved item back from server
      const savedTodo = await response.json();
      console.log("Server saved:", savedTodo);

      // 4. Update React State so the UI shows it immediately
      setTodos([...todos, savedTodo]);
      setInputValue(""); 
      
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      // 1. Tell Server to delete it
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'DELETE',
      });

      // 2. If server succeeds, update React UI
      // (This part stays the same as before)
      setTodos(todos.filter(todo => todo._id !== id));
      
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
      <h1>Full Stack App</h1>
      <h2>Connected to Node.js</h2>
      <Button label="Login" />
      <Button label="Register" />
      <Button label="Learn More" />
      <LikeButton />
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text} 
            {todo.completed ? " (Done)" : ""}
            <button onClick={() => deleteTodo(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
