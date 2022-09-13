import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducers } from "../reducers/cycles/reducer";

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}


export const CycleContext = createContext({} as CyclesContextType)

export function CycleContextProvider({children} : CyclesContextProviderProps) {

  const [ cyclesState , dispatch ] = useReducer(cyclesReducers, {
    cycles: [],
    activeCycleId: null,
  }, () => {
    const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

    if (storageStateAsJSON) {
      return JSON.parse(storageStateAsJSON)
    }
  })
  
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(() => {
    if(activeCycle) {
    return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
  }
     return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())}

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    
    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction())}

  return (
    <CycleContext.Provider 
          value={{
            cycles,
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed,
            interruptCurrentCycle,
            createNewCycle
          }} >
          {children}
        </CycleContext.Provider>

  )
}