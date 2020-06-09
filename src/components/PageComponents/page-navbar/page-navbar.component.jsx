import React from 'react';

import './page-navbar.styles.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'

class PageNavBar extends React.Component{
    constructor(){
        super();

        this.state = {
            navExpanded:false
        }
    }

    expandNav = () => this.setState({navExpanded: !this.state.navExpanded});

    closeNav = () => this.setState({ navExpanded:false})

    render(){
        const {navExpanded} = this.state;
        const {logo, brandName, render} = this.props;

        console.log(navExpanded);

        return(
            <Container>
                <Navbar expanded={navExpanded} id="pageHeader" className="rounded" variant="dark" expand="md">
                    <Navbar.Brand href="/jax-tides/">{logo ? logo : brandName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={this.expandNav}/>
                    <Navbar.Collapse className="navbar-right" id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {render(navExpanded, this.closeNav)}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        );
    }
}

export default PageNavBar;