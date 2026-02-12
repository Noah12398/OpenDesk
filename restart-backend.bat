@echo off
echo Stopping any process on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process %%a
    taskkill /F /PID %%a
)
echo Done!
timeout /t 2
echo Starting backend server...
cd backend
npm run dev
