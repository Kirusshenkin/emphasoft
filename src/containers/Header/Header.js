import React, {Component} from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

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
        const links = []
        if (this.props.isAuthenticated) {
            links.push({to: '/logout', label: 'Выйти', exact: false})
        }

        return (
            <header>
                <Container>
                    <Row>
                        <Col sm={8}/>
                        <Col sm={2}/>
                        <Col sm={2} style={{textAlign: "right"}}>
                            {this.renderLinks(links)}
                        </Col>
                    </Row>
                </Container>
            </header>
        )
    }
}

export default Header