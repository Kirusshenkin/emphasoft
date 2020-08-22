import React from 'react'
import styles from './Button.module.css'

const Button = props => {
    const style = [
        styles.Button,
        styles[props.type]
    ]

    return (
        <button
            onClick={props.onClick}
            className={style.join('')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button