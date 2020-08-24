import React, { Component } from 'react'
import is from 'is_js'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'
import './Auth.css'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
    state = {
        redirectToReferrer: false,
        isFormValid: false,
        formControls: {
            username: {
            value: '',
            type: 'text',
            label: 'username',
            errorMessage: 'Введите корректный username',
            valid: false,
            touched: false,
            validation: {
              required: true,
              minLength: 6
            }
          },
          password: {
            value: '',
            type: 'password',
            label: 'пароль',
            errorMessage: 'Введите корректный пароль',
            valid: false,
            touched: false,
            validation: {
              required: true,
              minLength: 6
            }
          }
        }
    }
    loginHandler = () => {
        this.props.auth(
          this.state.formControls.username.value,
          this.state.formControls.password.value,
          true
        )
    }
    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
          return true
        }
    
        let isValid = true
    
        if (validation.required) {
          isValid = value.trim() !== '' && isValid
        }
    
        if (validation.email) {
          isValid = is.string(value) && isValid
        }
    
        if (validation.minLength) {
          isValid = value.length >= validation.minLength && isValid
        }
    
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
    
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
    
        formControls[controlName] = control
    
        let isFormValid = true
    
        Object.keys(formControls).forEach(name => {
          isFormValid = formControls[name].valid && isFormValid
        })
    
        this.setState({
          formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
              />
            )
        })
    }

    
    render() {
      if(this.props.token) {
        return <Redirect to="/Table"/>
      }
        return (
          <div className="container">
            <div className="Auth-container">
              <div className="Auth">
                  <div className="title">Авторизация</div>
                  <form onSubmit={this.submitHandler}>
                      {this.props.error ? <span className="error">{this.props.error}</span> : <span></span>}
                      { this.renderInputs() }

                      <Button
                          type="success"
                          onClick={this.loginHandler}
                          dispatch={!this.state.isFormValid}
                      >
                          Войти
                      </Button>
                  </form>
              </div>
            </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.auth.error,
        token: state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (username, password) => dispatch(auth(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)