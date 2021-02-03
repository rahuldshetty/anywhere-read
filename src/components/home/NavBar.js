import React, {useState} from 'react'
import {NavDropdown, Navbar, Nav, Dropdown} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';
import Avatar from 'react-avatar';

export default function NavBar() {
    const [error, setError] = useState();
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout(){
        setError("")
        try{
            await logout()
            history.push('/login');
        } catch {
            setError("Failed to Logout!")
        }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand>
                    <img
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Anywhere-Read"
                    />
                </Navbar.Brand>
                <Nav className="mr-auto">

                </Nav>
                <Nav>
                    <Dropdown>
                        <Dropdown.Toggle>
                            <Avatar name={currentUser.displayName? currentUser.displayName: "Anonymous" } textSizeRatio={2} size="50" round={true} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu show>
                            <Dropdown.Header>{currentUser.displayName? currentUser.displayName: "Anonymous" }</Dropdown.Header>
                            <Dropdown.Item href="/update-profile">Edit Profile</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>

            </Navbar>
        </>
    )
}
