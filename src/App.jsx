import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

// function App() {
//   const [length, setLength] = useState(8)
//   const [numberAllowed, setNumberAllowed] = useState(false)
//   const [charAllowed, setCharAllowed] = useState(false)
//   const [password, setPassword] = useState("")




function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  


  
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"

    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(randomIndex)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyPassword = () => {
    passwordRef.current?.select()
    navigator.clipboard.writeText(password)

    passwordRef.current.style.backgroundColor = "#3b82f6" 
    passwordRef.current.style.color = "white"

    
    setTimeout(() => {
      passwordRef.current.style.backgroundColor = ""
      passwordRef.current.style.color = ""
    }, 1000)
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-5 my-10 text-orange-500 bg-gray-800'>
      
      <h1 className="text-white text-xl mb-4 text-center font-bold">
        Password Generator 🔐
      </h1>

      <div className="flex mb-4">
        <input
          ref={passwordRef}  
          type="text"
          value={password}
          readOnly
          className="outline-none w-full py-2 px-3 rounded-l-md bg-gray-700 text-white"
        />
        <button
          onClick={copyPassword}
          className="bg-blue-500 px-3 text-white rounded-r-md hover:bg-blue-600"
        >
          Copy
        </button>
      </div>

      <div className="flex items-center gap-x-2 mb-3">
        <input
          type="range"
          min={6}
          max={50}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <label>Length: {length}</label>
      </div>

      <div className="flex items-center gap-x-4 mb-3">
        <input
          type="checkbox"
          checked={numberAllowed}
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label>Numbers</label>

        <input
          type="checkbox"
          checked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label>Special Characters</label>
      </div>

      <button
        onClick={passwordGenerator}
     
    
      className="w-full bg-red-500 text-white py-2 rounded-md 
hover:bg-transparent hover:text-black-500
border-2 border-violet-500 
transition-all duration-300
hover:border-2 hover:border-violet-500"
      
      >
     
        Generate Password
      </button>
    </div>
  )
}

export default App
