import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form"
import { CycleContext } from "../../../../contexts/CyclesContext";


export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return(
    <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            type="text" 
            id='task' 
            list='task-suggestions'
            placeholder="Dê um nome para o seu projeto" 
            disabled={!!activeCycle}
            {...register("task")}
          />

          <datalist id='task-suggestions'>
            <option value="Projeto 01"/>
            <option value="Projeto 02"/>
            <option value="Projeto 03"/>
            <option value="Nothing"/>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            type="number" 
            disabled={!!activeCycle}
            step={5}
            min={5}
            max={60}
            id="minutesAmount" 
            placeholder="00"
            {...register("minutesAmount", { valueAsNumber: true})}
            />

          <span>minutos.</span>
        </FormContainer>
  )
}