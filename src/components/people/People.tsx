import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider.tsx";
import axios from "axios";
import { User } from "../../model/User.ts";
import { Link } from "react-router-dom";

const People = () => {
    const [people, setPeople] = useState<User[]>([]);

    const { token, user } = useContext(AuthContext)
    const isAuth = token.length > 0

    const getPeople = () => {
        axios.get(`${process.env.REACT_APP_HOST_NAME}/users`)
            .then((res) => {
                console.log("Fetched users:", res.data.users);
                console.log("Logged in user:", user);

                const filteredPeople = res.data.users.filter((person: User) => {
                    return person._id !== user?._id;
                });
                setPeople(filteredPeople);
                console.log("Filtered users:", filteredPeople);
            })
            .catch(err => {
                console.error(err.response)
            })
    }

    useEffect(() => {
        getPeople()
    }, [isAuth])

    return (
        <div className="People">
            <div className="people-header">
                <Link to="/" className="home-button">HOME</Link>
            </div>
            {isAuth && <div className="people-list">
                <ul>
                    {people.map(person =>
                        <div className="person" key={person._id}>
                            <div className='info'>
                                <h2>{person.username}</h2>
                                <Link to="/" className="home-button">Chat</Link>
                                <p>______________________</p>
                            </div>
                        </div>
                    )}
                </ul>
            </div>}
        </div>
    );
}

export default People;
