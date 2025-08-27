import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const BookContext = createContext();

const BookContextProvider = (props) => {
    // const [books, setBooks] = useState([
    //     {title: 'Atomic Habits', author: 'James Clear', id: 1},
    //     {title: 'The Alchemist', author: 'Paulo Coelho', id: 2},
    //     {title: 'The Power of Habit', author: 'Charles Duhigg', id: 3},
    //     {title: 'Educated', author: 'Tara Westover', id: 4},
    //     {title: 'Becoming', author: 'Michelle Obama', id: 5},
    // ])

    const [books, setBooks] = useState(() => {
        const localData = localStorage.getItem('books');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    const addBook = (title, author) => {
        setBooks([...books, { title, author, id: uuidv4() }]);
    };

    const removeBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    return (
        <BookContext.Provider value={{ books, addBook, removeBook }}>
            {props.children}
        </BookContext.Provider>
    );
}

export default BookContextProvider;