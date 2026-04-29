# Productr Backend API

This is the backend API for **Productr**, a product management dashboard. It handles authentication via Email OTP, product management (CRUD), and image uploads.

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add the following:

```env
PORT=5100
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
ALLOWED_ORIGIN=http://localhost:5173

# Brevo (formerly Sendinblue) API Configuration
BREVO_API_KEY=your_brevo_api_key_here
SENDER_EMAIL=your_verified_sender_email@gmail.com
```

### 4. Run the server
**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

---

## 🛠 Tech Stack
- **Node.js & Express**: Web framework.
- **MongoDB & Mongoose**: Database and modeling.
- **@getbrevo/brevo**: Transactional Email SDK for sending OTP verification emails via HTTP (reliable on Render).
- **Multer**: For handling local image uploads.
- **CORS**: Configured for secure frontend communication.

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/send-otp` - Send a 6-digit OTP to email.
- `POST /api/auth/verify-otp` - Verify OTP and receive an auth token.

### Products
- `GET /api/products` - Get all products (supports search/filter).
- `POST /api/products` - Create a new product.
- `PUT /api/products/:id` - Update a product.
- `DELETE /api/products/:id` - Delete a product.

### Uploads
- `POST /api/upload` - Upload images (returns local file paths).

---

## 🌐 Deployment
This backend is pre-configured for **Render**:
- Uses `process.env.PORT`.
- Includes `engines` in `package.json`.
- Automatically creates an `uploads/` folder on startup.
- **Important**: Uses the Brevo API instead of SMTP, which is necessary for Render because they block standard SMTP ports (587, 465) in their production environment.

> [!NOTE]  
> Images are stored locally in the `/uploads` folder. On Render's free tier, these files will be wiped when the server restarts.
