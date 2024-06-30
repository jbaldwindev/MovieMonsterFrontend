import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { useState, useEffect } from 'react';

function CustomNav() {
    const [show, setShow] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState("");
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {tooltipMessage}
        </Tooltip>
    );

    const searchFocus = () => {
        setTooltipMessage("showing some text!");
        setShow(true);
        
    }

    const searchBlur = () => {
        setTooltipMessage("showing ");
        setShow(false);
    }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">MovieMonster</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Movies</Nav.Link>
            <Nav.Link href="#">My List</Nav.Link>
          </Nav>
          <Form className="d-flex">
              <OverlayTrigger trigger="click" show={show} placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onFocus={searchFocus}
                  onBlur={searchBlur}
                />
            </OverlayTrigger>
            
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNav;