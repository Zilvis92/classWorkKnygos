import React, {useContext} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';

// class Navbar extends Component {
//     static contextType = ThemeContext;
//     render() { 
//         const { isLightTheme, light, dark } = this.context;
//         const theme = isLightTheme ? light : dark;

//         return (
//             <nav style={{ backgroundColor: theme.ui, color: theme.syntax }}>
//                 <h1>Context App</h1>
//                 <ul>
//                     <li>Home</li>
//                     <li>About</li>
//                     <li>Contact</li>
//                 </ul>
//             </nav>
//         );
//     }
// }

// class Navbar extends Component {
//     static contextType = ThemeContext;
//     render() { 
//         return (
//             <ThemeContext.Consumer>{(context) => {
//                 const { isLightTheme, light, dark } = this.context;
//                 const theme = isLightTheme ? light : dark;

//                 return (
//                     <nav style={{ backgroundColor: theme.ui, color: theme.syntax }}>
//                         <h1>Context App</h1>
//                         <ul>
//                             <li>Home</li>
//                             <li>About</li>
//                             <li>Contact</li>
//                         </ul>
//                     </nav>
//                 );
//             }}</ThemeContext.Consumer>
//         )
//     }
// }
 
const Navbar = () => {
    const {isAuthenticated, toggleAuth} = useContext(AuthContext);
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark

    return (
        <nav style={{ background: theme.ui, color: theme.syntax }}>
            <h1>Context App</h1>
            <div onClick={toggleAuth}>
                {isAuthenticated ? 'Logged in' : 'Logged out'}
            </div>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}

export default Navbar;
