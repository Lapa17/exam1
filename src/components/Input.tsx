import { ChangeEvent } from "react";

type InputPropsType = {
    value: number
    changeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    InputClass: string
  }
  
  const Input = (props: InputPropsType) => {
  
    return (
      <input type="number" value={props.value} onChange={props.changeHandler} className={props.InputClass} />
    )
  }

  export default Input;