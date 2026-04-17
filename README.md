# 🚛 TruckDispatch Management System

A full-stack truck dispatching management system built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 🏗️ Project Structure

```
truck-dispatch/
├── client/       ← React frontend
└── server/       ← Node.js + Express backend
```

---

## ⚙️ Setup Instructions

### 1. MongoDB Atlas (Database)
1. Go to https://cloud.mongodb.com and create a free account
2. Create a new cluster (free tier)
3. Create a database user (username & password)
4. Click "Connect" → "Connect your application" → copy the URI
5. Replace `<username>` and `<password>` in the URI

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/truck-dispatch
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

Seed the admin account (run once):
```bash
node seedAdmin.js
```

Start the server:
```bash
npm run dev
```

Server runs at: http://localhost:5000

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs at: http://localhost:3000

---

## 👤 Default Admin Credentials

| Field    | Value             |
|----------|-------------------|
| Email    | admin@truck.com   |
| Password | admin123          |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint          | Access | Description              |
|--------|-------------------|--------|--------------------------|
| POST   | /api/auth/register | Public | Register as driver       |
| POST   | /api/auth/login   | Public | Login (admin or driver)  |
| GET    | /api/auth/me      | Private | Get current user profile |
| PUT    | /api/auth/me      | Private | Update profile           |

### Drivers (Admin only)
| Method | Endpoint                    | Description           |
|--------|-----------------------------|-----------------------|
| GET    | /api/drivers                | Get all drivers       |
| GET    | /api/drivers/:id            | Get single driver     |
| PUT    | /api/drivers/:id/status     | Update driver status  |
| DELETE | /api/drivers/:id            | Delete driver         |

### Loads
| Method | Endpoint                | Access       | Description         |
|--------|-------------------------|--------------|---------------------|
| GET    | /api/loads              | Private      | Get loads           |
| GET    | /api/loads/:id          | Private      | Get single load     |
| POST   | /api/loads              | Private      | Create load         |
| PUT    | /api/loads/:id/assign   | Admin        | Assign driver       |
| PUT    | /api/loads/:id/status   | Private      | Update status       |
| DELETE | /api/loads/:id          | Admin        | Delete load         |

### Quotes
| Method | Endpoint        | Access | Description       |
|--------|-----------------|--------|-------------------|
| POST   | /api/quotes     | Public | Submit a quote    |
| GET    | /api/quotes     | Admin  | Get all quotes    |
| PUT    | /api/quotes/:id | Admin  | Update quote      |
| DELETE | /api/quotes/:id | Admin  | Delete quote      |

### Dispatch
| Method | Endpoint                    | Access    | Description             |
|--------|-----------------------------|-----------|-------------------------|
| GET    | /api/dispatch               | Admin     | All dispatches          |
| GET    | /api/dispatch/my            | Driver    | Driver's dispatches     |
| PUT    | /api/dispatch/:id/status    | Private   | Update dispatch status  |

### Dashboard
| Method | Endpoint             | Access | Description        |
|--------|----------------------|--------|--------------------|
| GET    | /api/dashboard/stats | Admin  | Dashboard stats    |

---

## 🚀 Deployment

### Backend → Render.com
1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect your GitHub repo → select `/server` folder
4. Add environment variables (MONGO_URI, JWT_SECRET)
5. Build command: `npm install` | Start command: `npm start`

### Frontend → Vercel
1. Go to vercel.com → Import Project
2. Connect GitHub repo → select `/client` folder
3. Add env variable: `REACT_APP_API_URL=https://your-render-url.onrender.com/api`
4. Deploy!

---

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router v6, Axios, React Toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (JSON Web Tokens) + bcryptjs
- **Deployment:** Vercel (frontend) + Render (backend) + MongoDB Atlas (DB)
