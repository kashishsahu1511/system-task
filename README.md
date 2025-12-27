# System Task — Auth Server

A simple Node.js + Express authentication server using MongoDB, JWT access & refresh tokens.

## Features ✅
- User registration and login
- JWT access and refresh tokens
- Password hashing with bcrypt
- Simple refresh token flow

## Quick Start 🚀

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the following variables:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

3. Run the server:

```bash
npm start
# or (for dev)
npm run dev
```

Server will start on `http://localhost:5000` (or the value of `PORT`).

## API Endpoints 🔧

- POST `/api/auth/register` — register a new user
  - Body: `{ "email": "...", "password": "..." }`
- POST `/api/auth/login` — login and receive tokens
  - Body: `{ "email": "...", "password": "..." }`
- POST `/api/auth/refresh-token` — exchange refresh token for a new access token
  - Body: `{ "refreshToken": "..." }`

## Environment
Make sure `.env` is NOT committed (it's in `.gitignore`).

## Development Tips 💡
- Use a short expiration for access tokens during testing.
- Store refresh tokens securely and rotate them if needed.

## Repository
This project is pushed to: https://github.com/kashishsahu1511/system-task

## License
MIT

---

If you want, I can also add contributing guidelines, code of conduct, or GitHub topics/README badges.