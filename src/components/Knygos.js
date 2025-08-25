import React, {useContext} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { use } from 'react';

const BookList = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    return (
        <div className='book-list' style={{ backgroundColor: theme.bg, color: theme.syntax }}>
            <ul>
                <li style={{ backgroundColor:theme.ui }}>Atomic Habits</li>
                <li style={{ backgroundColor:theme.ui }}>Principles</li>
                <li style={{ backgroundColor:theme.ui }}>The boy, the mole, the fox and the horse</li>
            </ul>
        </div>
    );
}
 
export default BookList;