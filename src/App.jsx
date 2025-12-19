import './App.css'
import { useState } from 'react';

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
  return (
    <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
      <h1>Hello React!</h1>
      <h2>Your Name</h2>
      <p>Full Stack Student</p>
      <Button label="Login" />
      <Button label="Register" />
      <Button label="Learn More" />
      <LikeButton />
    </div>
  )
}

export default App