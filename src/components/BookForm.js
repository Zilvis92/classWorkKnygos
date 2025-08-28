import { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';

const BookForm = () => {
    const { addBook } = useContext(BookContext);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Papildoma validacija
        if (!title.trim() || !author.trim()) {
            return; // Sustabdo formos siuntimą jei laukai tušti
        }
        addBook(title, author);
        setTitle('');
        setAuthor('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Knygos pavadinimas' value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type='text' placeholder='Autorius' value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <input type='submit' value='Pridėti knygą' />
        </form>
    );
}

export default BookForm;