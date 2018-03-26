import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = function (props) {

    const { user } = props;

    return (
        <nav className="NavBar">
            <NavLink exact to="/auctions">Auctions</NavLink>
            { " | " }
            <NavLink exact to="/auctions/new">New Auction</NavLink>
            { " | " }
            {
                (user)
                    ? <span>Hello, { user.first_name } { user.last_name }</span>
                    : <NavLink exact to="/sign_in">Sign In</NavLink>
            }
        </nav>
    );
};

export default NavBar;
