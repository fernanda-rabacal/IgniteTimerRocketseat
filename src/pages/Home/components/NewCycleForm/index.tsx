import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'

const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number()
    .min(5, "O ciclo precisa ser de no minimo 5 minutos")
    .max(60, "O ciclo precisa ser de no maximo 60 minutos"),
})

type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>

export function NewCycleForm() {

  const { register, handleSubmit, watch, reset, formState } = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

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