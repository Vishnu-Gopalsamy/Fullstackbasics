import React, { useState, useEffect } from 'react'

const Effects = () => {
    const [count, setCount] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);
    console.log(users);
    // useEffect(() => {
    //     console.log("from useeffect");
    // }, [count]);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>+</button>
            <ul>
                {
                    users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Effects