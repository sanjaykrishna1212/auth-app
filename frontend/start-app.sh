#!/bin/bash

echo "Starting Angular SPA Authentication Application..."
echo

echo "Setting up backend environment..."
cd backend
npm run setup
echo

echo "Installing backend dependencies..."
npm install
echo

echo "Seeding database..."
npm run seed
echo

echo "Starting backend server..."
gnome-terminal --title="Backend Server" -- bash -c "npm start; exec bash" 2>/dev/null || \
xterm -title "Backend Server" -e "npm start; bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && npm start"' 2>/dev/null || \
echo "Backend server started on http://localhost:3000"
echo "Backend server started on http://localhost:3000"
echo

echo "Installing frontend dependencies..."
cd ../frontend
npm install
echo

echo "Starting frontend application..."
gnome-terminal --title="Frontend Application" -- bash -c "npm start; exec bash" 2>/dev/null || \
xterm -title "Frontend Application" -e "npm start; bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && npm start"' 2>/dev/null || \
echo "Frontend application starting on http://localhost:4200"
echo "Frontend application starting on http://localhost:4200"
echo

echo "Application is starting up..."
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:4200"
echo
echo "Demo accounts:"
echo "- Admin: admin / admin123"
echo "- User: alice / user123"
echo "- User: bob / user123"
echo
