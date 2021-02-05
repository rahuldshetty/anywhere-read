import React, { useState, useEffect} from 'react'
import "./BookShelf.css";
import {Container, Spinner} from "react-bootstrap";

import {useAuth} from "../../../contexts/AuthContext";
import {firestore} from '../../../firebase';

export default function BookShelf() {
    const {currentUser} = useAuth();
    const [books, setBooks] = useState(null);

    var bookRef = firestore.collection("anywhere-read").doc("Books").collection(currentUser.uid);

    async function fetch_user_books(){
        bookRef.get().then((qnapshot)=>{
            let arr = []
            let idx = 0;
            let len = qnapshot.docs.length;
            
            let prv_tilted = false;

            qnapshot.forEach(docData => {
                let data = docData.data();
                let book = create_book(data.title, "green", docData.id);
                
                if(idx < len - 1 && !prv_tilted && Math.random() > 0.85)
                {
                    prv_tilted = true;
                    book = tilt_book(book)
                } else{
                    prv_tilted = false;
                }

                idx += 1;

                arr.push(book);
            });
            setBooks(arr);
        });
    }

    useEffect(() => {
        
        fetch_user_books();

        return () => {
            setBooks(null)
        }
    }, [])

    function tilt_book(book){
        return <div className="book-tilted">
            {book}
        </div>
    }

    function create_book(title, color, key){
        return (<div key={key} className={`book book-${color}`}>
            <h2>{title}</h2>
        </div>);
    }


    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            {!books && <Spinner animation="border" />}
            {books && <div className="bookshelf">{books}</div>}
        </Container>
    )
}
