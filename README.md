
```markdown
# 💸 Expense Tracker

A full-stack Expense Tracker application built using **Node.js**, **Express.js**, **Sequelize**, and **MySQL**. It allows users to track daily expenses, upgrade to premium via **Cashfree Payment Gateway**, and access advanced analytics. Password reset is also enabled via email using **Brevo**.

---

## 🧰 Tech Stack

### 🖥 Backend
- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **MySQL**

### 🌐 Frontend
- **HTML**, **CSS**, **JavaScript**
- **Bootstrap**

### 🔐 Authentication & Security
- **JWT (JSON Web Tokens)**
- **bcrypt** (password hashing)
- **dotenv** (environment variables)

### 💳 Payment Integration
- **Cashfree Payment Gateway** (test credentials)

### ✉️ Email Service
- **Brevo API** (for sending password reset links)

### ☁️ Deployment
- **AWS EC2** (backend deployment)
- **S3** (for static asset storage)
- **IAM & RDS** (database access & role permissions)

---

## 📁 Folder Structure

```

.
├── app.js
├── .env
├── package.json
├── config
│   └── config.json
├── controllers
│   ├── authController.js
│   ├── expenseController.js
│   ├── passwordController.js
│   ├── paymentController.js
│   └── premiumController.js
├── db
├── models
│   ├── users.js
│   ├── expenses.js
│   ├── forgotPassword.js
│   ├── orders.js
│   └── index.js
├── middleware
│   └── authMiddleware.js
├── migrations
├── public
│   ├── login.js
│   ├── signup.js
│   ├── expense.js
│   ├── premium.js
│   └── resetpassword.js
├── routes
│   ├── authRoutes.js
│   ├── expenseRoutes.js
│   ├── passwordRoutes.js
│   ├── paymentRoutes.js
│   ├── premiumRoutes.js
│   └── User.js
├── utils
│   └── brevoClient.js
└── views
├── login.html
├── signup.html
├── expense.html
├── premium.html
├── resetpassword.html
└── paymentSuccess.html

````

---

## 🔧 How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sagarbj3245/ExpenseTracker.git
cd ExpenseTracker
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up `.env` file

Create a `.env` file in the root directory and add:

```
JWT_SECRET=your_jwt_secret
CASHFREE_CLIENT_ID=your_cashfree_client_id
CASHFREE_CLIENT_SECRET=your_cashfree_client_secret
DB_NAME=expensetracker
DB_USER=root
DB_PASS=your_db_password
BREVO_API_KEY=your_brevo_api_key
RESET_PASSWORD_BASE_URL=http://localhost:3000/password/resetpassword
```

### 4️⃣ Set up MySQL

* Create a MySQL database with the name provided in `.env`
* Run Sequelize migrations (if applicable) or sync via `sequelize.sync()`

### 5️⃣ Run the server

```bash
node app.js
```

---

## 🌟 Features

* 🔐 **User Authentication** – Login, Signup, JWT protected routes
* 💸 **Add, View, Delete Expenses**
* 🏅 **Premium Membership** with **Cashfree Integration**
* 📊 **Leaderboard & Reports** (Premium only)
* 🔁 **Password Reset via Email** (using Brevo)
* 🧼 MVC Pattern with modular codebase

---

## 👨‍💻 Developer

**Sagar B J**
📧 [sagarbj001@gmail.com](mailto:sagarbj001@gmail.com)
🔗 [GitHub Profile](https://github.com/sagarbj3245)

---

## 📌 Links

* 🔗 Live Demo (if deployed): http://13.233.15.15:3000/
* 📦 GitHub: [https://github.com/sagarbj3245/ExpenseTracker](https://github.com/sagarbj3245/ExpenseTracker)

---

> ✅ Project completed for learning full-stack development and integrating real-time payment & email flows.


