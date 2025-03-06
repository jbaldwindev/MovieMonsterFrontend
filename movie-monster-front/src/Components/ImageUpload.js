import CustomNav from "./CustomNav";
import {useState, useEffect, useRef} from "react";
import Form from "react-bootstrap/Form";
import "../Styles/Profile.css";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const ImageUpload = (props) => {
    const [uploadedImage, setUploadedImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [file, setFile] = useState();
    const imageRef = useRef(null);
    const [crop, setCrop] = useState({
        unit: 'px',
        x: 25,
        y: 25,
        width: 50,
        height: 50
    });

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
                setCroppedImage(URL.createObjectURL(blob));
            }
        }, "image/png");
    }

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

    return (
        <div>
            <CustomNav/>
            {uploadedImage ? 
            <div>
                <ReactCrop crop={crop} onComplete={getCroppedImage} onChange={c => setCrop(c)} aspect={1} minHeight={25} minWidth={25} circularCrop={true} keepSelection={true}>
                    <img onLoad={imageLoaded} src={uploadedImage} ref={imageRef}/>
                </ReactCrop>
                <Button>Set profile picture</Button>
            </div>
            : 
            <div>No image uploaded yet</div>
            }
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload a profile picture</Form.Label>
                <Form.Control type="file" onChange={handleUpload}/>
            </Form.Group>
            {croppedImage ? <div>
                <Image src={croppedImage} roundedCircle/>
                <Image style={{width: "5%"}} src={croppedImage} roundedCircle/>
            </div> : <div>No crop to display</div>}
        </div>
    );
}

export default ImageUpload;