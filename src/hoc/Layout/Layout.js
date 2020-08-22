import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../containers/Header/Header'
import './Layout.css'

class Layout extends Component {
    render() {
        return (
            <div className="Layout">
                <Header
                    isAuthenticated={this.props.isAuthenticated}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)