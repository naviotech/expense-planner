import React, { createContext, useState, ReactNode } from "react";

export type ListSpent = {
  id:string,
  name: string,
  quantity: number,
  category:string,
  img:string
}

type BudgetContextType = {
  budget: number
  setBudget: React.Dispatch<React.SetStateAction<number>>
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  listSpent: ListSpent[]
  setListSpent: React.Dispatch<React.SetStateAction<ListSpent[]>>
};

export const BudgetContext = createContext<BudgetContextType>({
  budget: 0,
  setBudget: () => {},
  visible: false,
  setVisible: ()=> {},
  setListSpent: () => [],
  listSpent: [],

});

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [budget, setBudget] = useState(0)
  const [visible, setVisible]= useState(false)
  const [listSpent, setListSpent] = useState<ListSpent[]>([])

  return (
    <BudgetContext.Provider value={{ budget, setBudget, visible, setVisible, listSpent, setListSpent }}>
      {children}
    </BudgetContext.Provider>
  );
};
