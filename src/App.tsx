import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';




const App = () => {
  let [number,setNumber] = useState(0)

  const onIncClcikHandler = () =>{
    number++;
    setNumber(number)
  }
  const onResetHandler = () => {
    setNumber(0)
  }

  const incDisabled = number < 5? false : true
  const restDisabled = number > 0? false: true
  const divCounter= incDisabled? 'red counter': 'counter'
  
  

  return (
    <div className={'wrapper'}>
      <div className={divCounter}>{number}</div>
      <div className={'btnWrapper'}>
        <Button onClick={onIncClcikHandler} name={'inc'} disabled={incDisabled}/>
        <Button onClick={onResetHandler} name={'reset'} disabled={restDisabled}/>
        
      </div>
    </div>
  );
}

export default App;
