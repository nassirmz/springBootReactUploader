import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import UploadContainer from '../Upload/UploadContainer';

class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand className="header-column">
                        Spring Boot React Uploader
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem>
                   <UploadContainer />
                </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;