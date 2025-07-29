

```markdown
# 💸 ExpenseTracker - Premium Expense Management System

A full-stack Expense Tracker web application with authentication, password reset via email, premium membership (with Cashfree integration),  and secure REST APIs. Built using Node.js, Express, Sequelize ORM, and MySQL.

---

## 🚀 Features

- 🔐 User signup/login with JWT authentication
- 💰 Track, add, and delete expenses
- 💎 Premium membership via **Cashfree Payments**
- 📊 Premium dashboard with analytics
- 📧 Password reset via Brevo email API
- ☁️ MySQL + Sequelize ORM with migrations
- 🧠 Follows MVC architecture and secure backend practices

---

## 🛠️ Tech Stack

**Languages & Frameworks**  
- JavaScript, Node.js, Express.js  
- HTML, CSS, Bootstrap

**Database**  
- MySQL with Sequelize ORM  
- AWS RDS (optional for production)

**Authentication & Security**  
- JWT, bcrypt, dotenv  
- Role-based access for premium features

**APIs & Libraries**  
- Cashfree Payments  
- Brevo (email API)  
- Sequelize, Express Router

**DevOps/Cloud**  
- AWS EC2, IAM, RDS

**Tools**  
- Git, GitHub, Postman

---

## 📁 Folder Structure

```

ExpenseTracker/
├── app.js                   # Entry point
├── .env                    # Environment variables
├── package.json
├── config/
│   └── config.json         # DB configuration
├── controllers/            # Handles business logic
├── db/                     # Sequelize DB connection
├── middleware/             # Auth middleware
├── models/                 # Sequelize models
├── migrations/             # Sequelize migrations
├── public/                 # Frontend JavaScript
├── routes/                 # Express routes
├── utils/                  # Email client (Brevo)
├── views/                  # HTML pages (Login, Signup, Expense, Premium, Reset Password)

```

---

## 🔐 Environment Variables

Create a `.env` file at the root:

```

JWT\_SECRET=your\_jwt\_secret\_key
CASHFREE\_CLIENT\_ID=your\_cashfree\_client\_id
CASHFREE\_CLIENT\_SECRET=your\_cashfree\_client\_secret
DB\_NAME=expensetracker
DB\_USER=root
DB\_PASS=your\_mysql\_password
BREVO\_API\_KEY=your\_brevo\_api\_key
RESET\_PASSWORD\_BASE\_URL=[http://localhost:3000/password/resetpassword](http://localhost:3000/password/resetpassword)


````

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/sagarbj3245/ExpenseTracker.git
cd ExpenseTracker

# Install dependencies
npm install
````

---

## 🧪 Running the App

```bash
# Set up database via Sequelize migrations
npx sequelize-cli db:migrate

# Start the server
node app.js
```

Server runs on: `http://localhost:3000`

---

## 💳 Premium Membership

* Initiates Cashfree payment
* Verifies payment and updates user role
* Grants access to premium analytics and leaderboard

---

## 🔐 Auth & Security

* Passwords are hashed using **bcrypt**
* Tokens are signed with **JWT**
* Authorization handled via **middleware**
* Password reset tokens expire and are verified before use

---

## 📧 Password Reset (via Brevo)

1. User requests reset link
2. Email is sent with a reset link
3. New password is saved after token verification

---

## 📊 Premium Dashboard

* Total spent
* Filtered stats
* Leaderboard of all users (premium only)
* Expense downloads

---

## ✅ Dependencies

* `express`
* `sequelize`
* `mysql2`
* `jsonwebtoken`
* `bcrypt`
* `dotenv`
* `axios`
* `nodemailer` (Brevo API)
* `cashfree-pg`

---

## 🌐 Deployment

This project can be deployed on:

* **Frontend**: Netlify or AWS S3 (static)
* **Backend**: AWS EC2 or Render
* **Database**: AWS RDS MySQL

---

## 📬 Contact

**Sagar B J**
📧 Email: [sagarbj001@gmail.com](mailto:sagarbj001@gmail.com)
🔗 GitHub: [sagarbj3245](https://github.com/sagarbj3245)

---

