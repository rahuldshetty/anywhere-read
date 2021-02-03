import {React, useRef, useState } from 'react'
import {Card, Form, Button, Alert, Container} from 'react-bootstrap';
import {useAuth} from '../../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match!')
        }
        if(passwordRef.current.value.length < 6){
            return setError('Password length should be more than 6')
        }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch{
            setError("Failed to sign up!");
        }

        setLoading(false)
        
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card style={{ maxWidth: "400px", width:"400px" }}>
                <Card.Body>
                    <Card.Title>Sign Up</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>              
                        <Button type="submit" disabled={loading} className="w-100">Sign Up</Button>      
                    </Form>
                </Card.Body>    

                <Card.Footer>Already have an account? <Link to="/login">Login</Link></Card.Footer>
            
            </Card>
        </Container>
    )
}
