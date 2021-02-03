import {React, useRef, useState } from 'react'
import {Card, Form, Button, Alert, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';

export default function FotgotPassword() {
    const emailRef = useRef();

    const {resetPassword} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions.')

        } catch{
            setError("Failed to reset password!");
        }

        setLoading(false)
        
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card style={{ maxWidth: "400px", width:"400px" }}>
                <Card.Body>
                    <Card.Title>Forgot Password</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>    
                        <Button type="submit" disabled={loading} className="w-100">Reset Password</Button>      
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>

                </Card.Body>

                <Card.Footer>
                Need an account? <Link to="/signup">Sign up</Link>
                </Card.Footer>
            </Card>
        </Container>
    )
}
