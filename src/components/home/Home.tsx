import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/AuthProvider.tsx"
import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
    const { token } = useContext(AuthContext)
    const isAuth = token.length > 0

    return (
        <div className="Home">
            <Link to="/people">
                <img className="users-image" src="/users-icon.png" alt="Logo" />
            </Link>
            <Link to="/auth">
                <img className="user-image" src="/user-icon.png" alt="Logo" />
            </Link>
        </div>
    );
}

export default Home;
