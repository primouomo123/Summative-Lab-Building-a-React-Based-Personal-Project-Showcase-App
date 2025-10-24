import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>FlatShop</h1>
        <p>Welcome to FlatShop, your one-stop shop for all things flat!</p>
      </div>
    </>
  )
}

export default App
