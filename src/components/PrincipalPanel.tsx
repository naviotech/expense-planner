import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useBudget } from "../hooks/useBudget"
import { useState } from "react"
import Modal from "./Modal.tsx"
import AddSpent from "./AddSpent.tsx"
import { ListSpent } from "../context/BudgetContext.tsx"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

const PrincipalPanel = () => {
  const [selectItem, setSelectItem] = useState<ListSpent | null >(null)
  const [modal, setModal] = useState(false)
  const { budget, setBudget, setVisible, setListSpent, listSpent } = useBudget()

  const handleClick = () => {
    setModal(!modal)
  }
  
  const handleModal = (e: React.MouseEvent<Element, MouseEvent>)=>{
    const target = e.target as HTMLElement
    if(target.matches('.fixed')){
      handleClick()
      setSelectItem(null)
    }
  }

  const handleDelete=(id:string)=>{
    setListSpent(listSpent.filter(item => item.id !== id))
  }
  const handleUpdate = (item: ListSpent)=>{
    setSelectItem(item)
    setModal(true)
  }
    
  
  const spent = listSpent.reduce((quantity : number, item) => { return quantity += item.quantity},0)
  const percentage = +((spent / budget)*100).toFixed(2)


  const leadingActions= (item:ListSpent)=>(
    <LeadingActions>
      <SwipeAction onClick={()=>{handleUpdate(item)}}>
        Update
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions= (id:string)=>(
    <TrailingActions>
      <SwipeAction onClick={()=>handleDelete(id)} destructive={true}>
        Delete
      </SwipeAction>
    </TrailingActions>
  )
  return (
    <>
      <section className="flex flex-col gap-4 -mt-24 max-w-screen-xl lg:-mt-10" id="panel2">
        <h2 className="text-center font-bold text-xl lg:text-2xl">Your expenses</h2>
        <article className="lg:grid lg:grid-cols-2  w-full">
          <div className="p-4 flex flex-col justify-center items-center">
            <CircularProgressbar
              className="w-[80%] md:w-[60%] lg:w-[80%]"
              value={percentage}
              maxValue={100}
              minValue={0}
              styles={buildStyles({
                pathColor: percentage < 80 ? "#25BE2B":"#F3603C",
                trailColor: "#F5F5F5",
                textColor:percentage < 80 ? "#25BE2B":"#F3603C",
                textSize: 10
              })}
              text={`${percentage}%`}
            />
          </div>
          <article className="flex flex-col items-center justify-center mt-8 lg:mt-0">
            <h3 className="flex gap-2 justify-center items-center text-xl">Budget: <p className="font-bold text-xl text-green-600">{budget}$</p></h3>
            <h3 className="flex gap-2 justify-center items-center text-xl">Avaiable: <p className="font-bold text-xl">{budget-spent}$</p></h3>
            <h3 className="flex gap-2 justify-center items-center text-xl">Expenses: <p className="font-bold text-xl text-red-600">{spent}$</p></h3>
            <button className="py-2 px-6 bg-red-600 text-white mt-6 rounded-full hover:bg-red-500/50" onClick={()=>{setBudget(0), setVisible(false), setListSpent([])}}>Reset App</button>
            
          </article>
        </article>
        <div className="flex w-full justify-end">
            <svg onClick={handleClick} className="cursor-pointer hover:scale-105 transition-all mt-7 self-end" version="1.1" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
              
              <rect fill="#1D1E25" x="0" y="0" width="24" height="24" rx="12" ry="12"></rect>
              
              <path fill="#1D1E25" d="M23 12c0-3.037-1.232-5.789-3.222-7.778s-4.741-3.222-7.778-3.222-5.789 1.232-7.778 3.222-3.222 4.741-3.222 7.778 1.232 5.789 3.222 7.778 4.741 3.222 7.778 3.222 5.789-1.232 7.778-3.222 3.222-4.741 3.222-7.778zM21 12c0 2.486-1.006 4.734-2.636 6.364s-3.878 2.636-6.364 2.636-4.734-1.006-6.364-2.636-2.636-3.878-2.636-6.364 1.006-4.734 2.636-6.364 3.878-2.636 6.364-2.636 4.734 1.006 6.364 2.636 2.636 3.878 2.636 6.364z"></path>
              <path fill="#ffffff" d="M8 13h3v3c0 0.552 0.448 1 1 1s1-0.448 1-1v-3h3c0.552 0 1-0.448 1-1s-0.448-1-1-1h-3v-3c0-0.552-0.448-1-1-1s-1 0.448-1 1v3h-3c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
            </svg>
          </div>
        {modal && (<Modal handleModal={handleModal} children={<AddSpent item={selectItem} handleClick={handleClick}/>}></Modal>)}

      </section>
      <section className="flex flex-col gap-4 w-full mt-12 max-w-screen-md lg:mt-24">
        {listSpent.length > 0 ? (<p className="text-center">Swipe for <strong>Update</strong> or <strong>Delete</strong></p>):("")}
        {listSpent.length > 0 ? (listSpent.map((item : ListSpent)=>(
          <SwipeableList>
            <SwipeableListItem
            key={item.id}
              maxSwipe={30}
              leadingActions={leadingActions(item)}
              trailingActions={trailingActions(item.id)}
            >
              <div key={item.id} className="w-full flex p-6 gap-4 bg-[#97979770] rounded-xl lg:p-12 cursor-pointer">
                <img src={item.img} className="w-12"></img>
                <article className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold uppercase text-xl text-gray-900/50">{item.category}</h3>
                    <p className="uppercase font-bold">{item.name} </p>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-red-600">-{item.quantity}$</p>
                  </div>
                </article>
                
              </div>
            </SwipeableListItem>
          </SwipeableList>
        ))) : (<p className="text-center w-full font-bold uppercase">No expenses yet</p>)}
      </section>
    </>
    
  )
}

export default PrincipalPanel
