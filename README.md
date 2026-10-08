# Expense Management API

A RESTful Expense Management API built using Node.js, Express.js, MongoDB, and Mongoose.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JavaScript
* Postman

## Features

* User creation and management
* Unique email validation
* Expense CRUD operations
* User-expense relationship
* Filtering by user and category
* Date-range filtering
* Pagination
* Expense summary
* Category-wise expense aggregation
* Request validation
* Centralized error handling
* MongoDB database integration

## Project Structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validations/
└── app.js

postman/
└── Expense-Management-API.postman_collection.json
```

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Run the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The API runs by default on:

```text
http://localhost:5000
```

## API Endpoints

### Health Check

```http
GET /
```

### Users

```http
POST /api/users
GET /api/users
GET /api/users/:id
```

### Expenses

```http
POST /api/expenses
GET /api/expenses
GET /api/expenses/:id
PUT /api/expenses/:id
DELETE /api/expenses/:id
GET /api/expenses/summary
```

### Filtering and Pagination

```http
GET /api/expenses?page=1&limit=10
GET /api/expenses?userId=USER_ID
GET /api/expenses?category=Food
GET /api/expenses?fromDate=2026-01-01&toDate=2026-12-31
```

## Pagination Response

The expense listing API returns:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

## Error Response

Errors follow this format:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Postman

A ready-to-import Postman collection is included in:

```text
postman/Expense-Management-API.postman_collection.json
```

Import this file into Postman to test the API.

## Status Codes

* `200` - Success
* `201` - Created
* `400` - Bad Request
* `404` - Not Found
* `409` - Conflict
* `500` - Internal Server Error
