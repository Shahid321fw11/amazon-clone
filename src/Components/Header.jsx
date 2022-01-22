import React from 'react';
import '../Components/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';


function Header(){
    return(
        // top header , its divided into 3 part
        <div className="header">
            {/* 1st part */}
            <img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"></img>

            {/* 2nd part */}
            <div className="header_search">
                <input type="text" className="header_searchInput"/>
                <SearchIcon className="header_searchIcon"/>
            </div>

            {/* 3rd part */}
            <div className="header_nav">
                <div className="header_option">
                    <span className="header_optionLineOne">Hello </span>
                    <span className="header_optionLineTwo">Sign In</span>
                </div>
                <div className="header_option">
                    <span className="header_optionLineOne">Returns </span>
                    <span className="header_optionLineTwo">& Orders</span>
                </div>
                <div className="header_option">
                    <span className="header_optionLineOne">Your </span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <div className="header_optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header_optionLineTwo header_basketCount">0</span>
                </div>

            </div>

        </div>
    )
}
export default Header;