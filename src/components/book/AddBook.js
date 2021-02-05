import {React, useRef, useState } from 'react'
import {Card, Form, Button, Alert, Container, FormFile} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext";
import {storage, firestore} from '../../firebase';
import { nanoid } from 'nanoid';
import * as tf from '@tensorflow/tfjs';
import {fetch_class} from "../../ml";
import {useEffect} from "react";
import {PERMISSION_SELF, PERMISSION_OTHERS, PERMISSION_ALL} from "../permissions";

export default function AddBook() {
    const nameRef = useRef();
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const [error, setError] = useState('')
    const {currentUser} = useAuth();
    const [fileName, setFileName] = useState("Upload PDF File");
    const [file, setFile] = useState();
    const [category, setCategory] = useState('');

    const [model, setModel] = useState();
    
    useEffect(()=>{
        tf.ready().then(async ()=>{
            let _model = await tf.loadLayersModel(process.env.PUBLIC_URL + `/model/model.json`);
            setModel(_model);
        })
        return function cleanup() {   
            setModel();
        };
    }, []);
      
    var bookRef = firestore.collection("anywhere-read").doc("Books").collection(currentUser.uid);

    function handleCategoryChange(e){
        setLoading(true)
        let text = e.target.value;
        if(text.length > 10)
        {
            let result = fetch_class(model, text)
            setCategory(result);
        }
        setLoading(false)
    }

    function handleChange(e){
        if(e.target.files[0].name.endsWith(".pdf"))
        {
            setFileName(e.target.files[0].name)
            setFile(e.target.files[0])
        }
    }

    function fileUploadPromise(){
        return new Promise((resolve, reject)=>{
            const remote_id = nanoid();
            const uploadTask = storage.ref(`books/${currentUser.uid}/${remote_id}`).put(file);
            uploadTask.then((snapshot)=>{
                snapshot.ref.getDownloadURL().then((downloadURL)=>{
                    resolve(downloadURL);
                });
            });
        });
    }

    function storeURL(url){
        return new Promise((resolve)=>{
            bookRef.doc().set({
                "permission": PERMISSION_SELF,
                "title": nameRef.current.value,
                "url": url,
                "created": new Date(),
                "category": category
            })
            .then(()=>resolve(true))
            .catch(()=>resolve(false))
        });
    }


    async function handleSubmit(e){
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            
            if(fileName == null || !fileName.endsWith(".pdf")){
                setLoading(false)
                return setError("Invalid File!")
            }
            const url = await fileUploadPromise();
            const status = await storeURL(url);
            
            history.push("/")
        } catch{
            setError("Failed to upload!");
        }
        setFile(null);
        setFileName("Upload PDF File")
        setLoading(false)   
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <Card style={{ maxWidth: "400px",  width:"400px"}}>
                    <Card.Body>
                        <Card.Title>Upload your Book</Card.Title>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="name">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="title" ref={nameRef} onChange={handleCategoryChange} required></Form.Control>
                            </Form.Group>  
                            <Form.Group id="name">
                                <FormFile
                                    required
                                    type="file"
                                    label={fileName}
                                    accept=".pdf"
                                    onChange={handleChange}
                                    custom
                                />
                            </Form.Group>  
                            <Form.Group id="category">
                                <h6 muted>Category: {category}</h6>
                            </Form.Group>
                            <Button type="submit" disabled={loading} className="w-100">Upload</Button>      
                        </Form>

                    </Card.Body>
                    <Card.Footer>
                        <Link to="/">Cancel</Link>
                    </Card.Footer>
                </Card>

            </Container>
        </>
    )
}
