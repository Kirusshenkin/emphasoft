import React, {useState} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

export default props => {

    const [value, setValue] = useState('')


    const valueChangeHandler = event => {
        setValue(event.target.value)
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            
            props.onSearch(event.target.value)
        }
    }

    return (
        <InputGroup className="mb-3 mt-3" >
            <InputGroup.Prepend>
                <Button 
                variant="outline-secondary"
                onClick={() => props.onSearch(value)}
                >Поиск</Button>
            </InputGroup.Prepend>
            <FormControl 
                aria-describedby="basic-addon1"
                value={value}
                onChange={valueChangeHandler}
                onKeyPress={handleKeyPress}
            />
        </InputGroup>
    )
}