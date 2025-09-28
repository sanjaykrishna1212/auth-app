@echo off
echo Starting Angular SPA Authentication Application...
echo.

echo Setting up backend environment...
cd backend
call npm run setup
echo.

echo Installing backend dependencies...
call npm install
echo.

echo Seeding database...
call npm run seed
echo.

echo Starting backend server...
start "Backend Server" cmd /k "npm start"
echo Backend server started on http://localhost:3000
echo.

echo Installing frontend dependencies...
cd ../frontend
call npm install
echo.

echo Starting frontend application...
start "Frontend Application" cmd /k "npm start"
echo Frontend application starting on http://localhost:4200 --open
echo.

echo Application is starting up...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:4200
echo.
echo Demo accounts:
echo - Admin: admin / admin123
echo - User: alice / user123
echo - User: bob / user123
echo.
pause
