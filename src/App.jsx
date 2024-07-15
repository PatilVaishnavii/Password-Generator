
import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "@!#$%^&*()_+~/*-"
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

    }

    setPassword(pass)
  },
    [length, numberAllowed, charAllowed, setPassword])


  const copyToClipboard = useCallback(() => {
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(password);
  }, [password])


  useEffect(() => {
    passwordGenerator()
  },
    [length, numberAllowed, charAllowed, setPassword])


  //useRef hook
  const passRef = useRef(null);

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center bg-black">
        <div className=" w-auto h-40 bg-gray-800 rounded-lg shadow-lg pt-4 px-4 overflow-hidden">
          <h1 className="text-center mb-4 text-2xl text-white">Password Generator</h1>
          <input
            type="text"
            value={password}
            ref={passRef}
            className="outline-none w-72 py-1 px-3  text-orange-500 relative"
            placeholder="Password"
          />

          <button
            className="outline-none bg-blue-700 text-white px-3 py-1 absolute"
            onClick={copyToClipboard}
          >
            Copy
          </button>

          <div className="flex text-sm gap-x-2">
            <div className="flex text-center gap-x-1 mt-6">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}

              />
              <label className="text-orange-500">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1 mt-6">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label className="text-orange-500">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1 mt-6">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label className="text-orange-500">Characters</label>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
