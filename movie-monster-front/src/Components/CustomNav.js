import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import React, { useState, useEffect, useRef } from 'react';

function CustomNav() {
    const [show, setShow] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState("");
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {tooltipMessage}
        </Tooltip>
    );

    const searchFocus = (event) => {
        setTooltipMessage("showing some text!");
        setTarget(event.target);
        setShow(true);
        
    }

    const searchBlur = (event) => {
        setTooltipMessage("showing ");
        setShow(false);
    }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" ref={ref}>
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
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onFocus={searchFocus}
              onBlur={searchBlur}
            />
            
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        <Overlay
          show={show}
          trigger='click'
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
            <Popover id="popover-contained">
                <Popover.Header as="h3">Power Rangers</Popover.Header>
                <Popover.Header as="h3">Guardians of the galaxy unite 3: the third</Popover.Header>
                <Popover.Header as="h3">Transformers</Popover.Header>
            </Popover>
        </Overlay>
      </Container>
    </Navbar>
  );
}

export default CustomNav;