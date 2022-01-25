import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useStateValue } from './StateProvider';
import { Link } from "react-router-dom";
import { auth } from '../firebase';


function Header(){

    const[{basket,user},dispatch] = useStateValue();
    
    const handleAuthentication = () => {
        if (user){
            auth.signOut();
        }
    }

    return(
        // top header , its divided into 3 part
        <div className="header">
            {/* 1st part */}
            <Link to="/">
                <img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt=""></img>
            </Link>

            {/* 2nd part */}
            <div className="header_search">
                <input type="text" className="header_searchInput"/>
                <SearchIcon className="header_searchIcon"/>
            </div>

            {/* 3rd part */}
            <div className="header_nav">
                <Link to={!user && '/login'}>
                    <div className="header_option" onClick={handleAuthentication}>
                        <span className="header_optionLineOne">Hello {!user ? 'Guest' : user.email} </span>
                        <span className="header_optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                
                <Link to="/orders">
                    <div className="header_option">
                        <span className="header_optionLineOne">Returns </span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div>
                </Link>

                <div className="header_option">
                    <span className="header_optionLineOne">Your </span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <Link to='/checkout'>
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
                    </div>
                </Link>

            </div>

        </div>
    )
}
export default Header;