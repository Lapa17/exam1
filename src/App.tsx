import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';




const App = () => {
  let [number, setNumber] = useState(0)
  let [maxValue, setMaxValue] = useState(0)
  let [startValue, setStartValue] = useState(0)

  useEffect(()=>{
    let startValueAsStr = localStorage.getItem('startValue')
    if (startValueAsStr){
      let newStartValue = JSON.parse(startValueAsStr)
      setNumber(newStartValue)
    }
  },[])


  const onIncClcikHandler = () => setNumber(number+1)
  const onResetHandler = () => setNumber(startValue)
  const onSetHandler = () => {
    localStorage.setItem('maxValue', JSON.stringify(maxValue))
    localStorage.setItem('startValue', JSON.stringify(startValue))
    setNumber(startValue)
  }

  

  const incDisabled = number < maxValue ? false : true
  const restDisabled = number > startValue ? false : true
  const divCounter = incDisabled ? 'red counter' : 'counter'

  let onChangeMaxValueHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setMaxValue(JSON.parse(e.currentTarget.value))
  }
  let onChangeStartValueHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setStartValue(JSON.parse(e.currentTarget.value))
  }


  return (
    <div>
      <div className={'wrapper'}>
        <div className={divCounter}>{number}</div>
        <div className={'btnWrapper'}>
          <Button onClick={onIncClcikHandler} name={'inc'} disabled={incDisabled} />
          <Button onClick={onResetHandler} name={'reset'} disabled={restDisabled} />

        </div>
      </div>
      <div className={'wrapper'}>
        <span>Max value</span>
        <Input value={maxValue} changeHandler={onChangeMaxValueHandler}/>
        <span>start value</span>
        <Input value={startValue} changeHandler={onChangeStartValueHandler}/>
        <div className={'btnWrapper'}>
          <Button onClick={onSetHandler} name={'set'} disabled={false} />

        </div>
      </div>
    </div>
  );
}

export default App;

type InputPropsType = {
  value: number
  changeHandler:(e:ChangeEvent<HTMLInputElement>)=> void
}

const Input = (props: InputPropsType) => {

  return (
    <input type="number" value={props.value} onChange={props.changeHandler} />
  )
}