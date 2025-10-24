# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You'll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Technologies & Techniques

- **Node.js** & **Express.js** - Server and RESTful API framework
- **MongoDB** & **Mongoose** - Database and ODM for data modeling
- **validator** - URL validation for user avatars and clothing item images
- **ESLint** - Code quality tool with Airbnb style guide

### Key Features

- RESTful API with endpoints for users (`/users`) and clothing items (`/items`)
- Like/unlike functionality using `$addToSet` and `$pull` operators to prevent duplicate likes
- Schema validation (name length, URL format, weather types)
- Centralized error handling with appropriate HTTP status codes

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

## API Endpoints

### Users

- `POST /users` - Create a new user

### Clothing Items

- `GET /items` - Get all clothing items
- `POST /items` - Create a new clothing item
- `DELETE /items/:itemId` - Delete a clothing item
- `PUT /items/:itemId/likes` - Like an item
- `DELETE /items/:itemId/likes` - Unlike an item

## Project Structure

- `models/` - Mongoose schemas for User and ClothingItem
- `controllers/` - Request handlers for routes
- `routes/` - API route definitions
- `utils/` - Configuration and error constants

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/1ystwGq1bLl2MGPGUhTY5Zj3_Bt0-FmIL/view?usp=sharing), where I describe my
project and some challenges I faced while building it.
