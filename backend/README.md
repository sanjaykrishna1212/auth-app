# Angular SPA Authentication Application

A complete Single Page Application (SPA) built with Angular 19+ and Node.js backend with MongoDB integration. This application demonstrates user authentication, role-based access control, and async API processing.

## Features

### Frontend (Angular 19+)
- **Modern UI/UX**: Beautiful, responsive design with gradient backgrounds and smooth animations
- **Login System**: User authentication with User ID, Password, and Role selection
- **Role-Based Access**: Different interfaces for "General User" and "Admin" roles
- **Dashboard**: User profile display and personal records management
- **Admin Panel**: User management system for administrators
- **Async Processing**: Configurable API delay simulation for testing async operations
- **Loading States**: Spinner animations and loading indicators
- **Error Handling**: Comprehensive error messages and user feedback

### Backend (Node.js + MongoDB)
- **RESTful API**: Express.js server with proper routing
- **MongoDB Integration**: MongoDB with MongoDB client for data persistence
- **Authentication**: JWT-like token-based authentication system
- **Password Security**: bcrypt password hashing
- **Role Management**: User role validation and authorization
- **API Delay**: Configurable delay parameter for testing async operations
- **Data Seeding**: Pre-populated demo data

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Angular CLI (v19 or higher)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd auth-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=spa_app
PORT=3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Database Setup
Make sure MongoDB is running, then seed the database:
```bash
cd backend
npm run seed
```

This will create demo users:
- **Admin**: `admin` / `admin123`
- **General User**: `alice` / `user123`
- **General User**: `bob` / `user123`

## Running the Application

### 1. Start the Backend Server
```bash
cd backend
npm start
# or for development with auto-restart
npm run dev
```

The backend will run on `http://localhost:3000`

### 2. Start the Frontend Application
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:4200`

## Application Structure

### Backend Structure
```
backend/
├── server.js          # Main server file
├── db.js             # MongoDB connection
├── seed.js           # Database seeding
├── routes/
│   ├── auth.js       # Authentication routes
│   └── users.js      # User management routes
└── package.json
```

### Frontend Structure
```
frontend/src/app/
├── login/            # Login component
├── dashboard/        # Dashboard component
├── admin-users/      # Admin user management
├── services/         # API services
├── guards/           # Route guards
├── interceptors/     # HTTP interceptors
└── app.routes.ts     # Application routing
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login with delay parameter

### User Management
- `GET /api/users/me` - Get current user profile and records
- `GET /api/users` - Get all users (Admin only)
- `POST /api/users` - Create new user (Admin only)
- `DELETE /api/users/:userId` - Delete user (Admin only)

## Key Features Explained

### 1. Async Processing
The application includes a configurable delay parameter that can be set on login and data refresh operations. This simulates real-world API delays and demonstrates how the application handles async operations with loading states.

### 2. Role-Based Access Control
- **General Users**: Can view their profile and personal records
- **Admin Users**: Can manage all users, create new users, and delete existing users

### 3. Modern UI/UX
- Responsive design that works on desktop and mobile
- Loading spinners and smooth transitions
- Error handling with user-friendly messages
- Clean, modern interface with gradient backgrounds

### 4. Security Features
- Password hashing with bcrypt
- Token-based authentication
- Route guards for protected pages
- HTTP interceptors for automatic token inclusion

## Testing the Application

1. **Login as Admin**:
   - User ID: `admin`
   - Password: `admin123`
   - Access: Full admin panel with user management

2. **Login as General User**:
   - User ID: `alice` or `bob`
   - Password: `user123`
   - Access: Dashboard with personal records only

3. **Test Async Processing**:
   - Set delay values (e.g., 2000ms) in the login form or dashboard
   - Observe loading states and spinner animations

## Development Notes

- The application uses Angular 19+ with standalone components
- MongoDB is used for data persistence
- All API calls include proper error handling
- The frontend includes comprehensive loading states
- The design is fully responsive and accessible

## Troubleshooting

1. **MongoDB Connection Issues**: Ensure MongoDB is running and the connection string is correct
2. **Port Conflicts**: Change the PORT in .env if 3000 is already in use
3. **CORS Issues**: The backend includes CORS configuration for local development
4. **Build Issues**: Ensure all dependencies are installed with `npm install`

## License

This project is for educational purposes and demonstrates modern web development practices with Angular and Node.js.