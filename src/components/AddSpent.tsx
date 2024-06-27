import { useState } from "react";
import { useBudget } from "../hooks/useBudget";
import {v4 as uuidv4} from 'uuid'
import { ListSpent } from "../context/BudgetContext.tsx";
import { useEffect } from "react";
import { Alerta } from "./AlertForm.tsx";

type AddSpentProps = {
  handleClick: () => void,
  item: ListSpent | null
}

const AddSpent = ({handleClick, item}: AddSpentProps) => {
  const [ alerta, setAlerta ] = useState({message:'', error:false})
  const [visible, setVisible] = useState(false)
  const [update, setUpdate] = useState(false)
  const { setListSpent, listSpent } = useBudget()
  const [selectedValue, setSelectedValue] = useState('');
  const [name,setName] = useState('')
  const [quantity, setQuantity] = useState<number | null> (null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    let categoria = ''
    if(name === "" || quantity === null || selectedValue === ""){
      setAlerta({ message: "All fields are required", error: true });
      setVisible(true)
      return
    }
    if(quantity <= 0 ){
      setAlerta({ message: "The quantity cannot be equal to or less than 0", error: true });
      setVisible(true)
      return
    } 
    

    switch(selectedValue){
      case "/icono_casa.svg":
        categoria = "House"
        break;
      
      case "/icono_comida.svg":
        categoria = "Food"
        break

      case "/icono_ocio.svg":
        categoria = "Leisure"
        break

      case "/icono_suscripciones.svg":
        categoria = "Subscriptions"
        break
      case "/icono_gastos.svg":
        categoria = "Expenses"
        break

      case "/icono_salud.svg":
        categoria = "Health"
        break

      case "/icono_ahorro.svg":
        categoria = "Saving"
        break
    }
    if(!update){
      setListSpent((prevData : ListSpent[])=>[
        ...prevData,
        {
          id:uuidv4(),
          name,
          quantity,
          category: categoria,
          img: selectedValue
        }
      ])
      setSelectedValue('')
      setName('')
      setQuantity(null)
      handleClick()
    }else{
      setListSpent(listSpent.map((expense:ListSpent)=>{
        if(expense.id === item?.id){
          expense.name = name,
          expense.quantity = quantity,
          expense.img = selectedValue,
          expense.category = categoria
        }
        return expense
      }))
      setSelectedValue('')
      setName('')
      setQuantity(null)
      handleClick()
      setUpdate(false)
    }
    
  }

  useEffect(()=>{
    if(item !== null){
      setSelectedValue(item.img)
      setName(item.name)
      setQuantity(item.quantity)
      setUpdate(true)
    }
  },[item])

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [visible])
  return (
    <div className=" bg-white p-6 w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] rounded-xl">
      {visible &&(<Alerta alerta={alerta}/>)}
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
        <article className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold cursor-pointer">Spent Name:</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="name" className="border rounded-xl px-4 bg-gray-200 outline-black"/>
        </article>

        <article className="flex flex-col gap-2">
          <label htmlFor="quantity" className="font-bold cursor-pointer">Quantity:</label>
          <input value={quantity?? ""} onChange={(e)=> setQuantity(e.target.value === ""? null : +e.target.value)} type="number" name="quantity" id="quantity" className="border rounded-xl px-4 bg-gray-200 outline-black" />
        </article>

        <article className="flex flex-col gap-2">
          <label htmlFor="category" className="font-bold cursor-pointer">Category</label>
          <select id="category" value={selectedValue} onChange={(e)=>setSelectedValue(e.target.value)} className="border rounded-xl px-4 bg-gray-200 outline-black cursor-pointer">
            <option value="" >--</option>
            <option value={"/icono_casa.svg"}>House</option>
            <option value={"/icono_comida.svg"}>Food</option>
            <option value={"/icono_ocio.svg"}>Leisure</option>
            <option value={"/icono_suscripciones.svg"}>Subscriptions</option>
            <option value={"/icono_gastos.svg"}>Expenses</option>
            <option value={"/icono_salud.svg"}>Health</option>
            <option value={"/icono_ahorro.svg"}>Saving</option>
          </select>
        </article>
        
        <button className="m-auto py-2 px-6 bg-green-500 text-white mt-6 rounded-full hover:bg-green-700">{update? "Update Expense": "Add Expense"}</button>
      </form>
    </div>
  )
}

export default AddSpent
