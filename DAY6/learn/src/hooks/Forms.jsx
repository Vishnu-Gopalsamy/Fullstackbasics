import { useState } from "react";

const forms = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: ''
    });
    const [message, setMessage] = useState('');
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Submitting form data...');
        
        try {
            console.log('Submitting form data:', formData);
            
            // Try multiple options in case the server is running on a different port
            const options = [
                'http://localhost:3000/post',  // Primary option
                'http://127.0.0.1:3000/post',  // Alternative IP
                'http://localhost:5000/post'   // Alternative port
            ];
            
            let response = null;
            let error = null;
            
            // Try each URL until one works
            for (const url of options) {
                try {
                    console.log(`Attempting to connect to: ${url}`);
                    response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                        // Add a timeout so we don't wait too long
                        signal: AbortSignal.timeout(5000)
                    });
                    
                    // If we got here, the connection worked
                    console.log(`Connection successful to: ${url}`);
                    break;
                } catch (err) {
                    console.log(`Failed to connect to: ${url}`, err);
                    error = err;
                }
            }
            
            if (!response) {
                throw error || new Error('All connection attempts failed');
            }
            
            const data = await response.json();
            if (response.ok) {
                setMessage('User created successfully!');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    department: ''
                });
            } else {
                setMessage('Error: ' + (data.message || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Connection error details:', error);
            
            // Set a more specific error message based on the error type
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                setMessage(`Error: Cannot connect to the server. Is the server running?`);
            } else if (error.name === 'AbortError') {
                setMessage('Error: Connection timed out. Server might be slow or unavailable.');
            } else if (error.message.includes('NetworkError')) {
                setMessage('Network error. Your internet connection may be unstable.');
            } else {
                setMessage(`Error connecting to server: ${error.message}`);
            }
            
            // Display detailed troubleshooting in console
            console.log('\n===== TROUBLESHOOTING TIPS =====');
            console.log('1. Ensure backend server is running:');
            console.log('   - Go to backend folder: cd D:\\PLAC\\fullstack\\DAY6\\backend');
            console.log('   - Run: node server.js');
            console.log('\n2. Try these alternatives:');
            console.log('   - Run the simple test server: node simple-server.js');
            console.log('   - Run diagnostics: node diagnose-connection.js');
            console.log('\n3. Check for common issues:');
            console.log('   - CORS restrictions (try using the same port)');
            console.log('   - Firewall blocking connections');
            console.log('   - MongoDB connection issues');
            console.log('===== END TROUBLESHOOTING =====\n');
        }
    }
  return (
    <div>
        {message && <div className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</div>}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="department">Department:</label>
                <select id="department" name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default forms