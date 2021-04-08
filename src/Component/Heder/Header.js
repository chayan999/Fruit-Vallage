import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="ii">Fruits Vallige</a>

                    <div className="collapse navbar-collapse" id="navbarNav ms-5">
                        <ul className="navbar-nav ml-auto ">
                            <li to="/home" className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/inventory">Add Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/editproduct">Edit Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn btn-dengir" to="/login">Login</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;