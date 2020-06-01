import React from 'react';

import './page-navbar.styles.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'

const PageNavBar = ({ children }) => (
    <Container>
        <Navbar id="pageHeader" className="rounded" variant="dark" expand="md">
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="navbar-right" id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {children}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Container>
);

export default PageNavBar;