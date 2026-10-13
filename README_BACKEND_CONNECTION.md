# FinTrack Frontend - Spring Boot + MySQL Connected

## Run
1. Start the Spring Boot backend on http://localhost:8080.
2. Make sure MySQL database `fintrack` exists and backend application.properties has the correct MySQL password.
3. Run:
   npm install
   npm start
4. Open http://localhost:3000.

## User flow
Register -> user is stored in MySQL -> JWT returned -> Dashboard.
Login -> JWT -> user-specific Dashboard/Profile/Transactions/Budgets/Goals/Reports.

All protected API requests send `Authorization: Bearer <token>`.

Transactions, budgets and goals are created through the Spring Boot APIs and are tied to the authenticated user by the backend.
