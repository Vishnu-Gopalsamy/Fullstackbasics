@echo off
echo Setting up the backend...
cd backend
npm init -y
npm install express mongoose
echo.
echo Setup complete! Now you can run the server with:
echo npm run server