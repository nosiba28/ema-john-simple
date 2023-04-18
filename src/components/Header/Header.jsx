import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    console.log(user);
    const handleLogout = ()=>{
        logOut()
        .then(result=>{

        })
        .catch(error => console.log(error.message))
    }
    return (
        <nav className='header'>
            <dir>  <img src={logo} alt="" /></dir>
            <div>
            <Link to="/">Shop</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
            {user && <span className='text-white'>Welcome!{user.email} <button onClick={handleLogout}>Sign out</button></span>}
            </div>
        </nav>
    );
};

export default Header;