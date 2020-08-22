import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

class Header extends Component {
    
    renderLinks(links) {
        return links.map((link, key) => {
            return (
                <NavLink
                    key={key}
                    to={link.to}
                    exact={link.exact}
                    onClick={this.clickHandler}
                    className="header-btn"
                >
                    {link.label}
                </NavLink>
            )
        })
    }
    render() {
        const links = [
            // {to: '/Login', label: 'Авторизация', exact: true}
        ]

        if (this.props.isAuthenticated) {
            links.push({to: '/Table', label: 'Список пользователей', exact: false})
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to:'/Login', label: 'Авторизация', exact: false})
        }
        return (
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col md-8">
                            {this.renderLinks(links)}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header