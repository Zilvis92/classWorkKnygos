import React, {useContext} from 'react';
import { BookContext } from '../contexts/BookContext';
import BookDetails from './BookDetails';
// import { ThemeContext } from '../contexts/ThemeContext';

const BookList = () => {
    // const { isLightTheme, light, dark } = useContext(ThemeContext);
    // const theme = isLightTheme ? light : dark;
    const { books } = useContext(BookContext);

    return books.length ? (
        <div className='book-list'>
            <ul>
                {books.map(book => {
                    return (
                        <BookDetails book={book} key={book.id} />
                    );
                })}
            </ul>
        </div>
    ) : (
        <div className='empty'>Nėra skaitinių! Labas, laisvalaiki!</div>
    )

    // return (
    //     <div className='book-list' style={{ backgroundColor: theme.bg, color: theme.syntax }}>
    //         <ul>
    //             <li style={{ backgroundColor:theme.ui }}>Atomic Habits</li>
    //             <li style={{ backgroundColor:theme.ui }}>Principles</li>
    //             <li style={{ backgroundColor:theme.ui }}>The boy, the mole, the fox and the horse</li>
    //         </ul>
    //     </div>
    // );
}
 
export default BookList;