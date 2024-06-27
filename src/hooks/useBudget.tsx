import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export const useBudget = ()=>{
  const context = useContext(BudgetContext)
  if (context === undefined){
    throw new Error("Budget context must be used within a budgetProvider")
  }
  return context
}