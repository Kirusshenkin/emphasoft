import React, {Component} from 'react';
import Auth from './containers/Auth/Auth'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import {autoLogin} from './store/actions/auth';
import Layout from './hoc/Layout/Layout'
import Table from './containers/Table/Table'
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout'

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }
  render() {
    let routes =(
      <Switch>
        <Route path="/Login" exact component={Auth}/>
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/Table" exact component={Table}/>
          <Route to="/logout" component={Logout}/>
          <Redirect to="/Login" />
        </Switch>
      )
    }
    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))