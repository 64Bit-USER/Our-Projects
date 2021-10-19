import React from "react";
import "./nav-style.css";

function Navbar() {
    return (
        <>
            <div className="navbox">
                <h1>SK</h1>
                <div className="navitem-box">
                    <h4 className="navitems">Products</h4>
                    <h4 className="navitems">Cart</h4>
                    <h4 className="navitems">Logout</h4>
                </div>
            </div>
        </>
    );
}

export default Navbar;
