# 🚀 IDS HRMS - Human Resource Management System

A full-stack **Human Resource Management System (HRMS)** built using **React.js, Node.js, Express.js, and MySQL**. This application streamlines HR operations such as employee management, attendance tracking, payroll, leave management, recruitment, announcements, and offer letter generation through a modern and user-friendly interface.

---

## 📌 Features

### 👨‍💼 Employee Management
- Add, edit, view, and delete employee records
- Employee profile management
- Department and designation management

### 📅 Attendance Management
- Daily attendance tracking
- Attendance history
- Employee attendance records

### 💰 Payroll Management
- Generate employee payroll
- Salary calculation
- Payslip generation
- Payroll history

### 🏖️ Leave Management
- Apply for leave
- Approve or reject leave requests
- Leave history

### 📢 Announcement Module
- Create company announcements
- View latest announcements
- Organization-wide communication

### 📄 Offer Letter Management
- Generate offer letters
- Manage candidate offers
- Download offer documents

### 📊 Dashboard
- Employee statistics
- Attendance overview
- Leave statistics
- Payroll summary
- HR analytics

### 👤 User Management
- Role-based authentication
- Secure login system
- Admin and HR access

### 💵 Expense Management
- Expense tracking
- Expense approval workflow

### 🧑‍💻 Recruitment
- Job posting management
- Candidate management
- Interview scheduling

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router
- Axios
- CSS3
- Vite

## Backend
- Node.js
- Express.js
- JWT Authentication
- Joi Validation
- Multer
- PDFKit

## Database
- MySQL

## Version Control
- Git
- GitHub

---

# 📂 Project Structure

```
IDS_hrms
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── services
│   │   ├── repositories
│   │   ├── routes
│   │   ├── validations
│   │   ├── middlewares
│   │   ├── utils
│   │   └── app.js
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   └── validations
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/abhinash2006/IDS_hrms.git
```

---

## 2. Navigate to the project

```bash
cd IDS_hrms
```

---

## 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 5. Configure Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hrms_db

JWT_SECRET=your_secret_key
```

---

## 6. Start Backend

```bash
cd backend
npm start
```

---

## 7. Start Frontend

```bash
cd frontend
npm run dev
```

---

# 🗄️ Database

Create a MySQL database named:

```
hrms_db
```

Import your SQL tables before running the application.

---

# 📸 Modules Included

- Login
- Dashboard
- Employee Management
- Attendance
- Leave Management
- Payroll
- Payslip
- Recruitment
- Job Management
- Interview Management
- Offer Letter
- Expenses
- Announcements
- User Management
- Profile Management

---

# 🔒 Authentication

- JWT Based Authentication
- Protected Routes
- Role-Based Access

---

# 📈 Future Enhancements

- Email Notifications
- QR-Based Attendance
- Performance Management
- Employee Self-Service Portal
- Calendar Integration
- Mobile Responsive UI Improvements
- Report Generation
- AI-Based HR Analytics

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Create a Pull Request

---

# 👨‍💻 Author

**Abhinash Kumar Singh**

- GitHub: https://github.com/abhinash2006
- LinkedIn: www.linkedin.com/in/abhinash-singh-80b526334

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.