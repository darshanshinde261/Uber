# User Registration API

## Endpoint

`POST /api/v1/users/register`

## Description

Registers a new user in the system. The endpoint expects user details in the request body and returns the created user object along with an authentication token.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required): First name (minimum 3 characters)
- `fullname.lastname` (string, optional): Last name
- `email` (string, required): Valid email address
- `password` (string, required): Password (minimum 6 characters)

## Responses

- **201 Created**
  - User registered successfully.
  - Response body:
    ```json
    {
      "user": {
        "_id": "60f7c2b8e1b1c8a1b8e1b1c8",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **400 Bad Request**
  - Validation failed or missing required fields.
  - Response body:
    ```json
    {
      "errors": [
        {
          "msg": "first name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
      ]
    }
    ```

## Example Request

```sh
curl -X POST http://localhost:4000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```