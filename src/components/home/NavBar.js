import React, {useState} from 'react'
import {Navbar, Nav, Dropdown} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import Avatar from 'react-avatar';

export default function NavBar(props) {
    const [error, setError] = useState();
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const {url} = useRouteMatch();

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
        <style type="text/css">
        {`
        .btn-primary, .btn-primary.dropdown-toggle{
            background-color: transparent;
            border-color: transparent;
        }
        .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show > .btn-primary.dropdown-toggle{
            background-color: transparent;
            border-color: transparent;
        }
        .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show > .btn-primary.dropdown-toggle:focus{
            box-shadow: 0 0 0 .2rem rgba(0,0,0,0);
        }
        .btn-primary.focus, .btn-primary:focus{
            box-shadow: 0 0 0 .2rem rgba(0,0,0,0);
        }
        .navbar{
            padding: 0 1rem;
        }
        `
        }
        </style>

        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand>
                <img
                src="./logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Anywhere-Read"
                />
                {' '}
                Anywhere-Read
            </Navbar.Brand>
            <Nav className="mr-auto">

            </Nav>
            <Nav>
                <Dropdown>
                    <Dropdown.Toggle>
                        <Avatar name={currentUser.displayName? currentUser.displayName: "Anonymous" } textSizeRatio={2} size="50" round={true} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                        <Dropdown.Header>{currentUser.displayName? currentUser.displayName: "Anonymous" }</Dropdown.Header>
                        <Dropdown.Item as={Link} to={`/edit-profile`}>Edit Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>

        </Navbar>
        </>
    )
}
