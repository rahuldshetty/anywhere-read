import NavBar from './NavBar';
import React from "react";
import BookShelf from "./BookShelf/BookShelf";

export default function Dashboard(){

    return (
        <div>
            <NavBar/>
            <BookShelf/>
        </div>
    );
}