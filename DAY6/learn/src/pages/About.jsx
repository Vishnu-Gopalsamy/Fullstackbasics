import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../hooks/UserContext.jsx";
const About = () => {
    const name= useContext(UserContext).name;
    return (
        <div>
            <h1>About Page</h1>
            <h1>Hello! {name}</h1>
            <Link to="/state">Use state Example</Link>
            <br />
            <Link to="/form">Controlled Form</Link>
            <br />
            <Link to="/effect">Use Effect Example</Link>
            <br />
            <Link to="/reducer">Use Reducer Example</Link>
            <br />
        </div>
    );
}

export default About;