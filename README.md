# SUPER Auth API

A simple authentication backend with user registration, login, Google OAuth, OTP verification, and profile management.

## Features

- User registration and login with JWT authentication
- Google OAuth login
- OTP-based email verification
- Profile update with image upload (ImageKit)
- Password change and account deletion
- Token refresh endpoint

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- ImageKit account (for profile images)
- Google OAuth credentials

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/Roshanbadgujar/Super_auth
   cd cohort-auth
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_ACCESS_EXPIRATION=15m
   JWT_REFRESH_EXPIRATION=7d
   GMAIL_USER=your_gmail_address
   GMAIL_PASS=your_gmail_app_password
   OTP_SECRET=5
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK=http://localhost:3000/auth/google/callback
   CLIENT_URL=http://localhost:5500
   ```

4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Auth

- `POST /api/auth/register`  
  Register a new user.  
  **Body:** `{ "email": "...", "username": "...", "password": "..." }`

- `POST /api/auth/login`  
  Login user.  
  **Body:** `{ "email": "...", "password": "..." }`

- `GET /api/auth/profile`  
  Get user profile (requires authentication).

- `PUT /api/auth/profile`  
  Update user profile (requires authentication, supports image upload).

- `DELETE /api/auth/profile`  
  Delete user account (requires authentication).  
  **Body:** `{ "password": "..." }`

- `POST /api/auth/changePassword`  
  Change password (requires authentication).  
  **Body:** `{ "oldPassword": "...", "newPassword": "..." }`

- `GET /api/auth/users`  
  Get all users (requires authentication).

- `GET /api/auth/logout`  
  Logout user.

### OTP

- `POST /gmail/genrateotp`  
  Generate and send OTP to email.  
  **Body:** `{ "email": "..." }`

- `POST /gmail/recievedotp`  
  Verify OTP.  
  **Body:** `{ "email": "...", "otp": "..." }`

### Google OAuth

- `GET /auth/google`  
  Start Google OAuth login.

- `GET /auth/google/callback`  
  Google OAuth callback.

### Token Refresh

- `POST /refresh-token`  
  Refresh access token using refresh token cookie.

## Usage

- Use [Postman](https://www.postman.com/) or similar tool to test the endpoints.
- All endpoints (except register, login, OTP, and Google OAuth) require authentication via cookies.

---

**Made with ❤️ for easy learning and demonstration.**