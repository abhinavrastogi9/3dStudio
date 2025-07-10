# 3dStudio – 3D Model Viewer (MERN + Three.js)

**3dStudio** is a full-stack web app that allows authenticated users to upload and interact with `.obj` and `.glb` 3D models in the browser. It uses the MERN stack (MongoDB, Express, React, Node.js) and Three.js (via react-three-fiber) for rendering.

### 🌐 Live: [https://3dstudio.clikn.in](https://3dstudio.clikn.in)

---

## 🔧 Features

- Upload `.obj` and `.glb` files
- Real-time 3D rendering with pan, zoom, rotate
- Save camera interaction states (per model)
- User login, signup, logout (JWT Auth in HTTP-only cookies)
- Files stored on AWS S3, metadata in MongoDB

---

## 🚀 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/abhinavrastogi1/3dstudio.git
cd 3dstudio
```

### 2. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Set up .env files

```env
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret
AWS_REGION=ap-south-1
AWS_S3_BUCKET=3d-images-renderer
CORS_ORIGIN=http://localhost:5173
PORT=5000
MONGODB_URL=your_mongodb_atlas_url
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d
PRODUCTION=development
```

### frontend/.env

VITE_BASE_URL=http://localhost:5000/api

#### 4. Run locally

```bash
# In /backend
npm run dev

# In /frontend
npm run dev
```


 ### 📦 Tech Stack

Frontend: React + Vite + Redux Toolkit

3D: React Three Fiber + Drei

Backend: Node.js, Express.js

Auth: JWT + bcrypt

Storage: MongoDB Atlas + AWS S3

Deployment: Docker + Nginx + EC2 + Certbot
