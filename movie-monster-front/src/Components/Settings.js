import CustomNav from "./CustomNav";
import UserService from "../Services/UserService";
import { Container, Row, Col, Image, Modal, Button, Form } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import { useEffect, useState, useRef } from 'react';
import '../Styles/Settings.css';
function Settings() {
    const [iconUrl, setIconUrl] = useState();
    const [show, setShow] = useState(false);
    const [uploadedImage, setUploadedImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [croppedImageBlob, setCroppedImageBlob] = useState();
    const [file, setFile] = useState();
    const imageRef = useRef(null);
    const [crop, setCrop] = useState({
        unit: 'px',
        x: 25,
        y: 25,
        width: 50,
        height: 50
    });

    const handleClose = () => setShow(false);

    const imageLoaded = (e) => {
        const initialCrop = {
            unit:'px',
            x: (e.target.width - 50)/2,
            y: (e.target.height - 50)/2,
            width: 50,
            height: 50
        }
        setCrop(initialCrop);
    }

    const sendCroppedImage = () => {
            setShow(false);
            if (croppedImageBlob) {
                const formData = new FormData();
                formData.append("file", croppedImageBlob);
                UserService.uploadImage(formData, sessionStorage.getItem("username")).then(() => {
                    console.log("Image successfully uploaded");
                })
            }
        }

    const getCroppedImage = () => {
        if (!imageRef.current || !crop.width || !crop.height) return;
        //create a canvas
        const image = imageRef.current;
        const canvas1 = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas1.width = crop.width;
        canvas1.height = crop.height;
        const sx = scaleX * crop.x;
        const sy = scaleY * crop.y;
        const sWidth = crop.width * scaleX;
        const sHeight = crop.width * scaleY;
        const c1Context = canvas1.getContext("2d");
        c1Context.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, crop.width, crop.height);
        //draw image onto canvas
        //save canvas as data url
        canvas1.toBlob((blob) => {
            if (blob) {
                setCroppedImageBlob(blob);
                setCroppedImage(URL.createObjectURL(blob));
            }
        }, "image/png");
    }

    const handleUpload = (e) => {
        if (uploadedImage) {
            console.log(uploadedImage);
            URL.revokeObjectURL(uploadedImage);
        }
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadedImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    useEffect(() => {
        UserService.getIcon(sessionStorage.getItem("username")).then((res) => {
            setIconUrl(URL.createObjectURL(res.data));
        }).catch(error => {
          console.error("Error fetching image:", error);
        });
    }, []);

    return (
    <div>
        <CustomNav/>
        <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Upload a Profile Picture
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" onChange={handleUpload}/>
                </Form.Group>
                {uploadedImage ? 
                <div className="centered-container">
                    <div className="user-loaded-image-container div-2">
                        <ReactCrop className="user-loaded-image" crop={crop} onComplete={getCroppedImage} onChange={c => setCrop(c)} aspect={1} minHeight={25} minWidth={25} circularCrop={true} keepSelection={true}>
                            <img onLoad={imageLoaded} src={uploadedImage} ref={imageRef}/>
                        </ReactCrop>
                    </div>
                </div>
                : 
                <div>No image uploaded yet</div>
                }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={sendCroppedImage}>
                Save Changes
            </Button>
        </Modal.Footer>
        </Modal>
        <Container>
        <Row>
            <Col></Col>
            <Col className="d-flex flex-column align-items-center" sm={6}>
                <h4>{sessionStorage.getItem("username")}</h4>
                <Image className="icon-image" src={iconUrl} roundedCircle></Image>
                <a href="#" onClick={() => setShow(true)}>Change Profile Picture</a>
            </Col>
            <Col></Col>
        </Row>
        </Container>
    </div>
    );
}
export default Settings;