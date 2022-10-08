import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <Navbar variant="dark" className='navb'>
                <Container >

                    <LinkContainer to={'/'}>
                        <Navbar.Brand href="#home" className='home' >HOME</Navbar.Brand>
                    </LinkContainer>

                    {/* <Nav className='nav-container'>
                        <LinkContainer to={'/'}>
                            <Nav.Link href="#home">Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to={'/stories'}>
                            <Nav.Link href="#features">Stories</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/about'}>
                            <Nav.Link href="#pricing">About</Nav.Link>
                        </LinkContainer>

                    </Nav> */}
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;
