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
import MovieService from '../Services/MovieService';
import { useNavigate } from 'react-router-dom';
import "../Styles/CustomNav.css";

function CustomNav() {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const ref = useRef(null);
    const navigate = useNavigate();

    const searchFocus = (event) => {
        setTarget(event.target);
        setShow(true);
        
    }

    const searchBlur = (event) => {
        setShow(false);
        setMovieList([]);
    }

    const searchChange = (event) => {
        if (event.target.value) {
            MovieService.getSearch(event.target.value).then(res => {
                setMovieList(res.data.movieSearchList);
                // for (const movie of res.data.movieSearchList) {
                //     setMovieList([...movieList, movie]);
                // }
            });
        } else {
            setMovieList([]);
        }
    }

    const searchClick = (id) => {
        navigate("/Movie/" + id);
        navigate(0);
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
              onChange={searchChange}
            />
                {/* <div className="header-div">
                    { movieList[0] ? movieList.map((movieEntry) => (
                        <h5 onClick={() => {console.log("hello there")}}>{movieEntry.title}</h5>
                    )) 
                    : 
                    <div></div>
                    }
                </div> */}
            
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
                { movieList[0] ? movieList.map((movieEntry) => (
                    <div onClick={() => {searchClick(movieEntry.id)}}>
                        <Popover.Header as="h3">{movieEntry.title}</Popover.Header>
                    </div>
                )) 
                : 
                <div></div>
                }
            </Popover>
        </Overlay>
      </Container>
    </Navbar>
  );
}

export default CustomNav;