# basic-activity-booking-app

This is a basic Activity Booking App built using Node.js, Express, MongoDB, and JWT for authentication. The app allows users to:

Sign up: New users can register with an email, password, and phone number.

Login: Users can log in with their credentials to get an access token.

List Available Activities: Users can view a list of available activities like sports events, movie nights, and concerts.

Book Activities: Authenticated users can book activities, and these bookings are stored in their profile.

List Booked Activities: Authenticated users can view a list of activities they have booked.

Features:
JWT-based Authentication
User Registration and Login
Activity Management (Listing and Booking)
MongoDB for Data Storage

Instructions to run the code:

1. npm init, then npm i or npm install
2. provide ACCESS_TOKEN_SECRET and MONGODB_CONNECT in .env
3. run the code in command prompt using: node app.js
