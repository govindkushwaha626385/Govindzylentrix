# User Management REST API

A simple RESTful API built with Express.js that provides basic CRUD operations for managing users.

## Features

- Create a new user
- Retrieve all users
- Retrieve a single user by ID
- Update user details
- Delete a user
- Input validation
- Error handling

## Requirements

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. Clone the repository or extract the zip file
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   The server will start on port 5000 (or the port specified in the PORT environment variable)

## API Endpoints

### Get All Users
- **URL:** `/api/users`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of users
  ```json
  [
    {
      "id": 1,
      "name": "Govind Singh",
      "email": "govind@example.com",
      "age": 30
    }
  ]
  ```

### Get Single User
- **URL:** `/api/users/:id`
- **Method:** `GET`
- **URL Params:** `id=[integer]`
- **Success Response:**
  - **Code:** 200
  - **Content:** User object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "User not found" }`

### Create User
- **URL:** `/api/users`
- **Method:** `POST`
- **Data Params:**
  ```json
  {
    "name": "Govind Singh",
    "email": "govind@example.com",
    "age": 30
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** Created user object
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "message": "Error message" }`

### Update User
- **URL:** `/api/users/:id`
- **Method:** `PUT`
- **URL Params:** `id=[integer]`
- **Data Params:**
  ```json
  {
    "name": "Govind Singh",
    "email": "govind@example.com",
    "age": 30
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated user object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "User not found" }`

### Delete User
- **URL:** `/api/users/:id`
- **Method:** `DELETE`
- **URL Params:** `id=[integer]`
- **Success Response:**
  - **Code:** 204
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "User not found" }`

## Error Handling

The API includes validation for:
- Required fields (name, email, age)
- Email format
- Age validation (must be a positive number)
- Duplicate email addresses

## Testing

You can test the API using tools like Postman or curl. Here are some example curl commands:

```bash
# Get all users
curl http://localhost:5000/api/users

# Create a new user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Govind Singh","email":"govind@example.com","age":30}'

# Get user by ID
curl http://localhost:5000/api/users/1

# Update user
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Govind Updated","email":"govind@example.com","age":31}'

# Delete user
curl -X DELETE http://localhost:5000/api/users/1
```
