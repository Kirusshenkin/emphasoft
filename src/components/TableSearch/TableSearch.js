import React, {Component} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class TableSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formControls: {
                search: {
                    value: ''
                }
            }
        }
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
    
        control.value = event.target.value
        formControls[controlName] = control

        this.setState({
          formControls
        })
    }

    handleKeyPress = (event) => {
        // console.log('event',event)
        if(event.key === 'Enter'){
        this.props.onSearch(this.state.formControls.search.value)
        }
    }
    render() {
        const {value} = this.state.formControls.search
        // console.log(this.state.formControls.search.value)
        return (
            <InputGroup className="mb-3 mt-3" >
                <InputGroup.Prepend>
                    <Button 
                        variant="outline-secondary"
                        onClick={() => this.props.onSearch(value)}
                    >Поиск</Button>
                </InputGroup.Prepend>
                <FormControl 
                    aria-describedby="basic-addon1"
                    value={value}
                    onChange={event => this.onChangeHandler(event, 'search')}
                    onKeyPress={this.handleKeyPress}
                />
            </InputGroup>
        )
    }
}

export default TableSearch