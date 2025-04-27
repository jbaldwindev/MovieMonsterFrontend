import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import React, { useState, useEffect, useRef } from 'react';
import MovieService from '../Services/MovieService';
import UserService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import "../Styles/CustomNav.css";

function CustomNav() {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [iconUrl, setIconUrl] = useState();
    const ref = useRef(null);
    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);

    const searchFocus = (event) => {
        setTarget(event.target);
        setShow(true);
        
    }

    const searchBlur = (event) => {
        setShow(false);
        setMovieList([]);
    }

    const handleResize = (width) => {
      setWidth(width);
    }

    useEffect(() => {
      const resizeListener = () => handleResize(window.innerWidth);
      window.addEventListener("resize", resizeListener);
      UserService.getIcon(sessionStorage.getItem("username")).then((res) => {
          setIconUrl(URL.createObjectURL(res.data));
      }).catch(error => {
          console.error("Error fetching image:", error);
      });
    }, []);

    const searchChange = (event) => {
        if (event.target.value) {
            MovieService.getSearch(event.target.value).then(res => {
                setMovieList(res.data.movieSearchList);
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
        <Navbar.Brand href="/" className="colored">MovieMonster</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/Dashboard">Home</Nav.Link>
            <Nav.Link href="/Movies">Movies</Nav.Link>
            <Nav.Link href="/MyList">My List</Nav.Link>
            <Nav.Link href="/Friends">Friends</Nav.Link>
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
            <Button variant="outline-success">Search</Button>
            
          </Form>
          {width > 990 ? 
          <NavDropdown
          className="ms-3"
          align="end"
          title={
            <span><Image src={iconUrl} className="profile-pic" roundedCircle /></span>
          }>
            <NavDropdown.Item href={"/Profile/" + sessionStorage.getItem("username")}>Profile</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/Settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item>Sign Out</NavDropdown.Item>
          </NavDropdown>
          : 
          <></>
          }
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
                        <Popover.Header className='suggestion' as="h3">{movieEntry.title}</Popover.Header>
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