import { useBudget } from "../hooks/useBudget"
import { useState } from "react"
const FirstForm = () => {
  const [valid, setValid] = useState<number | null> (null)
  const {setBudget, setVisible} = useBudget()
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(valid == null || valid <= 0){
      setValid(null)
      setVisible(false)
      return
    }   
    setBudget(valid)
    setVisible(true)
  }
  
  
  return (
    <section className="-mt-24 mb-10 w-full md:flex md:flex-col md:justify-center md:items-center max-w-screen-md lg:-mt-10" id="panel1">
      <h2 className="font-bold text-center text-xl mb-12">Introduce your budget</h2>
      <form className="panel p-5 flex flex-col bg-[#FFF0EC] gap-6 md:min-w-[70%]" onSubmit={handleSubmit}>
        <input value={valid ?? ''}
            onChange={(e) => setValid(e.target.value === '' ? null : +e.target.value)} type="number" placeholder="500" className="p-2 text-[#F3603C] outline-none"></input>
        <button className="bg-[#1D1E25] text-white p-2 hover:bg-[#1D1E25]/50 transition-colors" type="submit">Check</button>
      </form>
    </section>
  )
}

export default FirstForm
