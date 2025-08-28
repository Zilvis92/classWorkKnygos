import React, {useContext} from 'react';
import { BookContext }  from '../contexts/BookContext';

const Navbar = () => {
    const {books} = useContext(BookContext);

    return (
        <div className="navbar">
            <h1>Mano skaitinių sąrašas</h1>
            <p>Šiuo metu turiu {books.length} knygas, kurias noriu perskaityti</p>
        </div>
    );
};

export default Navbar;
