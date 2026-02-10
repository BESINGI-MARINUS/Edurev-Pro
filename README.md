# EduRev Pro API

A minimal RESTful API for EduRev Pro — a student exam tracking, prediction and recommendation platform.

## Features

- User signup and login (students, lecturers, admin)
- JWT authentication with cookie support
- Role-based access control (admin-restricted routes)
- User (lecturer/student) creation and retrieval endpoints
- Centralized error handling and input validation

## Tech Stack

- Node.js (CommonJS)
- Express
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for credential hashing

## Project Structure

- `app.js` - Express app configuration (middleware, routes, error handler)
- `server.js` - App bootstrap and MongoDB connection
- `controllers/` - Route handlers (`authController.js`, `userController.js`)
- `models/` - Mongoose models (`userModel.js`)
- `Routes/` - Express route definitions (`userRoutes.js`)
- `utils/` - Helpers (`AppError.js`, `catchAsync.js`, `createSendToken.js`, `globalErrorHandler.js`)
- `config.env` - Environment variables (not checked into source control)
- `README.md` - This file

## Environment Variables

Create a `config.env` in the project root with these values (examples):

```
DB = mongodb+srv://<USER>:<PASSWORD>@cluster.mongodb.net/edurev
DB_PASSWORD = yourDbPassword
NODE_ENV = development
PORT = 3000
JWT_SECRET = your_jwt_secret
JWT_EXPIRES_IN = 90d
JWT_COOKIE_EXPIRES_IN = 90
```

Do NOT commit secrets to source control.

## Installation

1. Clone the repository

```bash
git clone <repo-url>
cd Edurev-Pro
```

2. Install dependencies

```bash
npm install
```

3. Add `config.env` (see "Environment Variables")

4. Start the development server

```bash
npm run dev
```

Start production server

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start server with `nodemon` (development)
- `npm start` - Start server with `node` (production)
- `npm run debug` - starts the debuging process with `ndb` (make sure ndb is installed globally on your computer)

## API Summary

Base route: `/api/v1/users`

- `POST /signup` — Register a new user.
  - Body: `{ "name": "...", "email": "...", "matricule": "..." }`
  - Response: JWT cookie + user object (the `matricule` is omitted in response).

- `POST /login` — Login using `{ "email": "...", "matricule": "..." }`.
  - Response: JWT cookie + user object.

- `GET /` — (Admin only) Get all users.
- `POST /` — (Admin only) Create a lecturer. Body same as signup plus `role: "lecturer"`.
- `GET /:id` — (Admin only) Get a single user (currently a placeholder).

Authentication: Protected routes require a valid JWT provided either in the `jwt` cookie or the `Authorization: Bearer <token>` header. Role checks use the `restrictTo` middleware in `controllers/authController.js`.

## Implementation Notes

- The `matricule` field is treated as the secret credential and is hashed with `bcryptjs` before saving via a `pre('save')` hook in `models/userModel.js`.
- The `createSendToken` utility signs a JWT with `JWT_SECRET`, sets a cookie named `jwt`, removes `matricule` from the returned user object, and returns the token and user in JSON.
- Centralized error handling is implemented in `utils/globalErrorHandler.js` using the `AppError` class.

## Development Tips

- Set `NODE_ENV=development` to enable `morgan` logging.
- Use Postman or similar to test endpoints; either enable cookies or extract the token from responses and use `Authorization: Bearer <token>` header.

## Contributing

- Open issues or PRs on the repository. Follow the existing code style. ESLint and Prettier configs are included in `devDependencies`.

## License

ISC

## Contact

Project author: Besingi Marinus
Repository: https://github.com/BESINGI-MARINUS/Edurev-Pro
