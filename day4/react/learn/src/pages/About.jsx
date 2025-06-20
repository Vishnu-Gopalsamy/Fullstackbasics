import { Link } from "react-router-dom";

const About = () => {
    return (
        <div>
            <h1>About Page</h1>
            <Link to="/state">Use state Example</Link>
            <br />
            <Link to="/form">Controlled Form</Link>
            <br />
            <Link to="/effect">Use Effect Example</Link>
        </div>
    );
}

export default About;