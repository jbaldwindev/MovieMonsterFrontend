import CustomNav from './CustomNav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import UserService from '../Services/UserService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../Styles/Bio.css';

const Bio = (props) => {
    const [writtenBio, setWrittenBio] = useState("");
    const [currentBio, setCurrentBio] = useState("");
    
    const submitBio = () => {
        UserService.setBio(sessionStorage.getItem('username'), writtenBio).then((res) => {
            getBio();
        });
    }

    const updateBio = (e) => {
        setWrittenBio(e.target.value);
    }

    const getBio = () => {
        UserService.getBio(sessionStorage.getItem('username')).then((res) => {
            setCurrentBio(res.data)
        });
    }

    useEffect(() => {
        getBio();
    }, []);

    return (
        <div>
            <CustomNav/>
            
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <div className="header-underline text-centered space-top">Current Bio</div>
                        <div>{currentBio}</div>
                        <div className="space-top-double">
                            <Form onSubmit={submitBio}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Update bio:</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={writtenBio} onChange={updateBio}/>
                                </Form.Group>
                                <div className="flex-right-align">
                                    <Button variant="primary" type="submit">
                                        Update
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Bio;