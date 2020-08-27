import React from 'react'
import styles from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const style = [styles.Input]

    if (isInvalid(props)) {
        style.push(styles.invalid)
    }

    return (
        <div className={style.join(' ')}>
            <input 
                type={inputType}
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Input