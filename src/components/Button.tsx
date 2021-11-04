import React from 'react';
import s from '../components/Button.module.css'

type ButtonPropsType ={
    onClick:() => void
    name: string
    disabled?: boolean
}

const Button = (props:ButtonPropsType) => {
    return (
        <button className={s.item} onClick={props.onClick} disabled = {props.disabled}>{props.name}</button>
    )
}

export default Button;