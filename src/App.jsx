import { useState, useCallback ,useEffect ,useRef} from 'react'

import './App.css'

function App() {
  const [length,setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState (false) 
  const [password, setPassword] = useState("")
  const [text,setText] = useState("Copy")
  const RefPass = useRef()
  const passswordGenerator = useCallback(()=>{
    setText("copy")
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*()"

    for(let i = 1;i < length ; i++){
        let char = Math.floor(Math.random()* str.length+1)

        pass +=str.charAt(char)

    }

    setPassword(pass)
  },[length,charAllowed,numberAllowed,setPassword])

  const copyPassword = useCallback(()=>{
    setText("copied")
    RefPass.current?.select()
      window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(passswordGenerator,[length,charAllowed,numberAllowed
    ])
  return (
    <>
      <div class = "max-w-xl mx-auto bg-gray-500 text-white px-2 py-1 rounded-lg mt-10 font-serif"> 
        <p class=" text-1xl m-2 text-2xl shadow-md  italic font-bold">Password Generator</p>

      <div class="flex  justify-center px-5 m-4 gap-3">
        <input type='text' value={password} placeholder = 'password' class=" font-bold w-full rounded-lg text-black p-1" 
        readOnly
        ref={RefPass}
        >
        </input>
        <p onClick = {copyPassword} class=" bg-blue-600  rounded-md px-2 py-1 cursor-pointer" >{text}</p>
      </div>

      <div class = "flex ">
        <div class = "flex mx-auto text-md gap-x-1">
            <input type="range" 
            min={6}
            max={16}
            value = {length}
            class = "cursor-pointer"
            onChange={(e)=> {
              setLength(e.target.value)
            }
            }
            />
              <label> Length : {length}</label>
        </div>

        <div class=" flex items-center gap-x-2">
          <input type = "checkbox" defaultChecked = {numberAllowed} id="numberInput" 
          onChange={()=>
            setNumberAllowed(prev=>!prev)
          }/>
          <label class="gap-x-2">Numbers</label>
          <input type = "checkbox" defaultChecked = {charAllowed} id="numberInput" 
          onChange={()=>
            setCharAllowed(prev=>!prev)
          }/>
          <label class="gap-x-2"> Characters</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
