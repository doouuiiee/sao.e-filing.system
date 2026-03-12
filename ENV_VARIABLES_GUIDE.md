# Complete .env Variables Guide

## 📋 Your Current .env File

Based on what you showed me earlier, here's what you currently have:

```env
# MongoDB Connection (MongoDB Atlas - Cloud Database)
MONGODB_URI=mongodb+srv://doouuiiee_db_user:Capstone2026@cluster0.mr5rsn1.mongodb.net/sao-erecord?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret (change this to a random string for security)
JWT_SECRET=sao_erecord_secret_key_2026_cordova_catholic_school

# Email Configuration (Gmail)
EMAIL_USER=sao.digital.records@gmail.com
EMAIL_PASS=shxm yuzw rthm jvpq

# Server Port
PORT=5000

# Frontend URL (for CORS and password reset links)
FRONTEND_URL=http://localhost:5000
```

---

## ✅ Complete .env Template

Here's the COMPLETE list of all environment variables you need:

```env
# ============================================
# DATABASE CONFIGURATION
# ============================================

# MongoDB Connection String
# Get this from MongoDB Atlas: Clusters → Connect → Connect your application
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Example (your current one):
# MONGODB_URI=mongodb+srv://doouuiiee_db_user:Capstone2026@cluster0.mr5rsn1.mongodb.net/sao-erecord?retryWrites=true&w=majority&appName=Cluster0


# ============================================
# AUTHENTICATION & SECURITY
# ============================================

# JWT Secret Key (for token generation)
# Generate a strong random secret: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Example (your current one):
# JWT_SECRET=sao_erecord_secret_key_2026_cordova_catholic_school

# Session Secret (optional, for express-session if you use it)
SESSION_SECRET=your_session_secret_here


# ============================================
# EMAIL CONFIGURATION
# ============================================

# Gmail Account for Sending Emails
EMAIL_USER=your-email@gmail.com

# Gmail App Password (NOT your regular Gmail password)
# Get this from: Google Account → Security → 2-Step Verification → App passwords
EMAIL_PASS=your_16_character_app_password

# Example (your current ones):
# EMAIL_USER=sao.digital.records@gmail.com
# EMAIL_PASS=shxm yuzw rthm jvpq

# Email Service (optional, defaults to gmail)
EMAIL_SERVICE=gmail

# Email From Name (optional)
EMAIL_FROM_NAME=SAO E-Record System


# ============================================
# SERVER CONFIGURATION
# ============================================

# Server Port
PORT=5000

# Node Environment (development, production, test)
NODE_ENV=development

# Frontend URL (for CORS and email links)
# Development:
FRONTEND_URL=http://localhost:5000
# Production (when deployed to Render):
# FRONTEND_URL=https://your-app-name.onrender.com


# ============================================
# FIREBASE CONFIGURATION (Optional - for backend)
# ============================================

# Firebase Project ID
FIREBASE_PROJECT_ID=logininfo-c2e4a

# Firebase Client Email (from serviceAccountKey.json)
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@logininfo-c2e4a.iam.gserviceaccount.com

# Firebase Private Key (from serviceAccountKey.json)
# Note: Keep the quotes and \n characters
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"

# Firebase Database URL (optional)
FIREBASE_DATABASE_URL=https://logininfo-c2e4a-default-rtdb.asia-southeast1.firebasedatabase.app


# ============================================
# FILE UPLOAD CONFIGURATION (Optional)
# ============================================

# Maximum file upload size (in MB)
MAX_FILE_SIZE=10

# Allowed file types (comma-separated)
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf

# Upload directory
UPLOAD_DIR=uploads


# ============================================
# NOTIFICATION CONFIGURATION (Optional)
# ============================================

# Enable email notifications
ENABLE_EMAIL_NOTIFICATIONS=true

# Enable SMS notifications (if you add SMS service)
ENABLE_SMS_NOTIFICATIONS=false

# SMS API Key (if using SMS service like Twilio or Semaphore)
SMS_API_KEY=your_sms_api_key_here


# ============================================
# RATE LIMITING (Optional)
# ============================================

# Rate limit window (in minutes)
RATE_LIMIT_WINDOW=15

# Maximum requests per window
RATE_LIMIT_MAX_REQUESTS=100


# ============================================
# CORS CONFIGURATION (Optional)
# ============================================

# Allowed origins (comma-separated)
CORS_ORIGIN=http://localhost:5000,http://localhost:3000

# Allow credentials
CORS_CREDENTIALS=true


# ============================================
# LOGGING (Optional)
# ============================================

# Log level (error, warn, info, debug)
LOG_LEVEL=info

# Log to file
LOG_TO_FILE=false


# ============================================
# BACKUP CONFIGURATION (Optional)
# ============================================

# Automatic backup enabled
AUTO_BACKUP=false

# Backup frequency (in hours)
BACKUP_FREQUENCY=24

# Backup directory
BACKUP_DIR=backups
```

---

## 🎯 Minimum Required Variables

For your project to work, you MUST have these:

```env
# Required for basic functionality
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
FRONTEND_URL=http://localhost:5000
```

---

## 📝 How to Get Each Variable

### 1. MONGODB_URI

**Where to get it:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

**Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**Your current one:**
```
mongodb+srv://doouuiiee_db_user:Capstone2026@cluster0.mr5rsn1.mongodb.net/sao-erecord?retryWrites=true&w=majority&appName=Cluster0
```

---

### 2. JWT_SECRET

**How to generate a strong secret:**

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 64

# Option 3: Online generator
# Visit: https://randomkeygen.com/
```

**Example output:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

**Your current one:**
```
sao_erecord_secret_key_2026_cordova_catholic_school
```

⚠️ **Recommendation:** Generate a new random one for better security

---

### 3. EMAIL_USER

**What it is:**
Your Gmail address that will send emails

**Your current one:**
```
sao.digital.records@gmail.com
```

---

### 4. EMAIL_PASS

**⚠️ IMPORTANT:** This is NOT your regular Gmail password!

**How to get Gmail App Password:**

1. Go to your Google Account: https://myaccount.google.com
2. Click "Security" in the left menu
3. Enable "2-Step Verification" (if not already enabled)
4. Go back to Security
5. Click "App passwords"
6. Select "Mail" and "Other (Custom name)"
7. Enter "SAO E-Record System"
8. Click "Generate"
9. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)

**Format:**
```
16 characters, no spaces in .env file
Example: abcd efgh ijkl mnop → abcdefghijklmnop
```

**Your current one:**
```
shxm yuzw rthm jvpq
```

---

### 5. PORT

**What it is:**
The port your server runs on

**Default:**
```
PORT=5000
```

**Note:** Render will override this with their own port in production

---

### 6. FRONTEND_URL

**Development:**
```
FRONTEND_URL=http://localhost:5000
```

**Production (Render):**
```
FRONTEND_URL=https://your-app-name.onrender.com
```

**What it's used for:**
- CORS configuration
- Email links (password reset, etc.)
- Redirects

---

## 🔧 Optional Variables Explained

### Firebase Backend Variables

Only needed if you want to use Firebase Admin SDK on the backend:

```env
FIREBASE_PROJECT_ID=logininfo-c2e4a
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@logininfo-c2e4a.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**How to get these:**
1. Download `serviceAccountKey.json` from Firebase Console
2. Extract values from the JSON file
3. Add to .env

**Note:** You can also just use the `serviceAccountKey.json` file directly (already configured in `config/firebase.js`)

---

### File Upload Variables

```env
MAX_FILE_SIZE=10                    # Maximum file size in MB
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf
UPLOAD_DIR=uploads                  # Where to store uploaded files
```

---

### Notification Variables

```env
ENABLE_EMAIL_NOTIFICATIONS=true     # Send email notifications
ENABLE_SMS_NOTIFICATIONS=false      # Send SMS notifications (requires SMS service)
SMS_API_KEY=your_sms_api_key       # If using SMS service
```

---

### Rate Limiting

```env
RATE_LIMIT_WINDOW=15               # Time window in minutes
RATE_LIMIT_MAX_REQUESTS=100        # Max requests per window per IP
```

---

## 📋 Your Complete .env File

Here's what your complete `.env` file should look like:

```env
# ============================================
# REQUIRED VARIABLES
# ============================================

# MongoDB
MONGODB_URI=mongodb+srv://doouuiiee_db_user:Capstone2026@cluster0.mr5rsn1.mongodb.net/sao-erecord?retryWrites=true&w=majority&appName=Cluster0

# Security
JWT_SECRET=sao_erecord_secret_key_2026_cordova_catholic_school

# Email
EMAIL_USER=sao.digital.records@gmail.com
EMAIL_PASS=shxm yuzw rthm jvpq

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5000

# ============================================
# OPTIONAL VARIABLES (Add as needed)
# ============================================

# Firebase (optional - if using Firebase Admin SDK)
# FIREBASE_PROJECT_ID=logininfo-c2e4a
# FIREBASE_CLIENT_EMAIL=your-firebase-email@project.iam.gserviceaccount.com
# FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# File Uploads (optional)
# MAX_FILE_SIZE=10
# ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf
# UPLOAD_DIR=uploads

# Notifications (optional)
# ENABLE_EMAIL_NOTIFICATIONS=true
# ENABLE_SMS_NOTIFICATIONS=false

# Rate Limiting (optional)
# RATE_LIMIT_WINDOW=15
# RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🚀 For Render Deployment

When deploying to Render, add these environment variables in the Render dashboard:

### Required:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
FRONTEND_URL=https://your-app-name.onrender.com
NODE_ENV=production
```

### Optional:
```
FIREBASE_PROJECT_ID=logininfo-c2e4a
MAX_FILE_SIZE=10
ENABLE_EMAIL_NOTIFICATIONS=true
```

---

## ✅ Checklist

Before running your app:

- [ ] `.env` file created in root directory
- [ ] All required variables added
- [ ] MongoDB connection string is correct
- [ ] Gmail app password generated (not regular password)
- [ ] JWT secret is strong and random
- [ ] PORT is set to 5000
- [ ] FRONTEND_URL matches your environment
- [ ] `.env` is in `.gitignore` (already done ✅)

---

## 🔒 Security Reminders

1. ✅ Never commit `.env` to Git
2. ✅ Use different values for development and production
3. ✅ Generate strong random JWT secret
4. ✅ Use Gmail App Password, not regular password
5. ✅ Keep `.env` file secure and backed up
6. ✅ Rotate secrets periodically

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist
- Check username and password

### "Email not sending"
- Use Gmail App Password, not regular password
- Check EMAIL_USER and EMAIL_PASS
- Enable "Less secure app access" if needed

### "JWT error"
- Check JWT_SECRET is set
- Check JWT_SECRET is long enough (minimum 32 characters)

### "Port already in use"
- Change PORT to different number (3000, 8080, etc.)
- Or kill process using port 5000

---

You're all set! Your `.env` file contains everything you need to run the SAO E-Record Filing System. 🎉
