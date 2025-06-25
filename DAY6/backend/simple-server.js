// A minimal server with no external dependencies
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  
  if (req.url === '/api/test') {
    // Simple test endpoint
    res.end(JSON.stringify({
      success: true,
      message: 'Simple server is working!',
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/post' && req.method === 'POST') {
    // Handle POST request
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Received data:', data);
        res.end(JSON.stringify({
          success: true,
          message: 'Data received successfully',
          data: data
        }));
      } catch (error) {
        res.end(JSON.stringify({
          success: false,
          message: 'Error parsing data',
          error: error.message
        }));
      }
    });
  } else {
    // Default response
    res.end(JSON.stringify({
      success: true,
      message: 'Simple server is running',
      endpoints: ['/api/test', '/post (POST)'],
      timestamp: new Date().toISOString()
    }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Simple server is running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/api/test`);
});