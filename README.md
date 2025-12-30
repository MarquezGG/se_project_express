# WTWR (What to Wear?) - Backend

## Introduction

This is the backend server for the WTWR (What to Wear?) application. The project's objective is to create a robust, secure RESTful API that handles user authentication, clothing item management, and data persistence for the WTWR frontend application.

### Goals

- Build a scalable Node.js/Express server with RESTful API architecture
- Implement secure user authentication using JWT tokens
- Design and manage a MongoDB database for users and clothing items
- Apply centralized error handling and input validation
- Deploy the application on a remote server with process management

## What Was Done and How

### Server Architecture

The backend was built using **Node.js** and **Express.js**, following the MVC (Model-View-Controller) pattern. The application is structured into separate directories for routes, controllers, models, middlewares, and utilities.

### Database Design

**MongoDB** with **Mongoose ODM** was used for data persistence. Two main schemas were created:

- **User Schema**: Stores user credentials (email, hashed password), profile information (name, avatar URL)
- **ClothingItem Schema**: Stores item details (name, weather type, image URL, owner reference, likes array)

### Authentication & Security

- **JWT (JSON Web Tokens)** for stateless authentication
- **bcrypt** for secure password hashing
- **celebrate/Joi** for request validation
- Centralized error handling with custom error classes (BadRequestError, UnauthorizedError, NotFoundError, ForbiddenError, ConflictError)

### API Implementation

RESTful endpoints were created for all CRUD operations:

- User registration and login with validation
- Protected routes requiring authentication
- Clothing item creation, retrieval, and deletion
- Like/unlike functionality using MongoDB operators ($addToSet, $pull)

### Logging & Monitoring

**Winston** and **express-winston** were implemented for:

- Request logging (stored in request.log)
- Error logging (stored in error.log)
- Console output for development

### Deployment

The application is deployed on a Google Cloud VM with:

- **PM2** for process management and automatic restarts
- **Nginx** as a reverse proxy
- Domain configuration with DNS

### Technologies Used

- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **celebrate/Joi** - Request validation
- **Winston** - Logging
- **ESLint** - Code quality (Airbnb style guide)
- **PM2** - Process management
- **Nginx** - Reverse proxy

## Results

The project successfully delivers a production-ready backend API:

- ✅ RESTful API with full CRUD operations
- ✅ Secure user authentication with JWT
- ✅ Input validation on all endpoints
- ✅ Centralized error handling with appropriate HTTP status codes
- ✅ Request and error logging
- ✅ Deployed on remote server with PM2 and Nginx
- ✅ ESLint compliance with Airbnb style guide

## Ideas for Further Improvement

1. **Rate Limiting** - Prevent abuse with request rate limiting
2. **Email Verification** - Confirm user email addresses during registration
3. **Password Reset** - Allow users to reset forgotten passwords via email
4. **Image Upload** - Integrate cloud storage (AWS S3, Cloudinary) for user-uploaded images
5. **Caching** - Implement Redis caching for frequently accessed data
6. **Testing** - Add comprehensive unit and integration tests with Jest
7. **API Documentation** - Generate Swagger/OpenAPI documentation
8. **HTTPS** - Configure SSL certificates for secure connections

### Authentication

- `POST /signup` - Register a new user
- `POST /signin` - Login and receive JWT token

### Users (Protected)

- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update current user profile

### Clothing Items

- `GET /items` - Get all clothing items
- `POST /items` - Create a new item (protected)
- `DELETE /items/:itemId` - Delete an item (protected, owner only)
- `PUT /items/:itemId/likes` - Like an item (protected)
- `DELETE /items/:itemId/likes` - Unlike an item (protected)

## Links

- **Backend API**: http://api.tripletenrules.jumpingcrab.com
- **Frontend (Live)**: https://tripletenrules.jumpingcrab.com
- **Frontend Repository**: [WTWR Frontend](https://github.com/MarquezGG/se_project_react)
