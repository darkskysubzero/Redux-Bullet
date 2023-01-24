import React from 'react'
import icon from "../icon.png";
import AddPost from './Posts/AddPost';

const Header = () => {
    return (
        <header className='navbar'>
            <nav >
                <img src={icon} />
                <p>Redux Bullet</p>
                <AddPost />
            </nav>
        </header>
    )
}

export default Header