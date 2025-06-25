@echo off
echo =================================================
echo FULLSTACK APPLICATION STARTER
echo =================================================
echo.

echo Step 1: Checking if dependencies are installed...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    npm install express mongoose
)
cd ..
echo Backend dependencies checked.
echo.

echo Step 2: Starting the backend server...
echo.
echo The server will start in a new window.
start cmd /k "cd backend && node server.js"
echo.
echo If the server window didn't open, please manually start it with:
echo cd backend && node server.js
echo.

echo Step 3: Testing the connection...
echo.
echo Waiting 3 seconds for the server to start...
timeout /t 3 /nobreak > nul

echo Testing if server is running by making a request...
curl -s http://localhost:3000/ > nul
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Server is responding.
    echo.
    echo Open this URL in your browser to see if the server is working:
    echo http://localhost:3000/
) else (
    echo WARNING: Server might not be running correctly.
    echo.
    echo Try these troubleshooting steps:
    echo - Check the server window for any errors
    echo - Run the diagnostic tool: node backend\diagnose-connection.js
    echo - Try the simplified server: node backend\simple-server.js
)
echo.

echo Step 4: Running the React application...
echo.
echo Please verify the server is working before proceeding.
echo.
echo To start the React app:
echo cd learn
echo npm start
echo.
echo =================================================
echo.