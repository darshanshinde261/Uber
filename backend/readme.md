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

---

# User Login API

## Endpoint

`POST /api/v1/users/login`

## Description

Authenticates a user with email and password. Returns the user object and an authentication token if credentials are valid.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required): Registered email address
- `password` (string, required): User's password (minimum 6 characters)

## Responses

- **200 OK**
  - Login successful.
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
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**
  - Invalid email or password.
  - Response body:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

## Example Request

```sh
curl -X POST http://localhost:4000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

# User Profile API

## Endpoint

`GET /api/v1/users/profile`

## Description

Returns the authenticated user's profile information. Requires a valid authentication token (JWT) in the `Authorization` header or as a cookie.

## Request Headers

- `Authorization: Bearer <token>` (or cookie named `token`)

## Responses

- **200 OK**
  - Returns the user's profile.
    ```json
    {
      "_id": "60f7c2b8e1b1c8a1b8e1b1c8",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```

- **401 Unauthorized**
  - Missing or invalid authentication token.
    ```json
    {
      "message": "Authentication token is missing"
    }
    ```
    or
    ```json
    {
      "message": "Invalid authentication token"
    }
    ```

## Example Request

```sh
curl -X GET http://localhost:4000/api/v1/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

# User Logout API

## Endpoint

`GET /api/v1/users/logout`

## Description

Logs out the authenticated user by blacklisting the current authentication token and clearing the authentication cookie. Requires a valid authentication token.

## Request Headers

- `Authorization: Bearer <token>` (or cookie named `token`)

## Responses

- **200 OK**
  - Logout successful.
    ```json
    {
      "message": "log out successfully"
    }
    ```

- **401 Unauthorized**
  - Missing or invalid authentication token.
    ```json
    {
      "message": "Authentication token is missing"
    }
    ```
    or
    ```json
    {
      "message": "Invalid authentication token"
    }
    ```

## Example Request

```sh
curl -X GET http://localhost:4000/api/v1/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```