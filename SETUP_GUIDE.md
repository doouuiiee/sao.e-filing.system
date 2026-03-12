# 🚀 Quick Setup Guide
## SAO E-Record Filing System

This guide will help you get the system running on your computer.

---

## ✅ What You Already Have

Good news! You already have:
- ✅ Node.js (v24.14.0)
- ✅ npm (v11.9.0)
- ✅ VS Code

---

## 📥 What You Need to Install

### 1. MongoDB (Database)

**Download:**
Go to: https://www.mongodb.com/try/download/community

**Installation Steps:**
1. Download "MongoDB Community Server" for Windows
2. Run the installer
3. Choose "Complete" installation
4. Check "Install MongoDB as a Service"
5. Click "Install"

**Verify Installation:**
Open Command Prompt and type:
```bash
mongod --version
```

If you see version information, MongoDB is installed correctly!

---

## 🔧 Project Setup

### Step 1: Open Terminal in VS Code

1. Open VS Code
2. Open your project folder
3. Press `` Ctrl + ` `` (backtick) to open terminal
4. Or go to: Terminal → New Terminal

### Step 2: Install Dependencies

In the terminal, run:
```bash
npm install
```

Wait for it to complete. This installs all required packages.

### Step 3: Install Nodemon (Optional but Recommended)

This tool automatically restarts your server when you make changes:
```bash
npm install -g nodemon
```

---

## ⚙️ Configuration

### Edit .env File

Open the `.env` file in VS Code and update:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sao-system
JWT_SECRET=change_this_to_a_random_secret_key_12345
EMAIL_USER=sao.digital.records@gmail.com
EMAIL_PASS=your_gmail_app_password_here
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to any random string!

### Setup Gmail for Emails

1. Go to: https://myaccount.google.com/
2. Click "Security"
3. Enable "2-Step Verification"
4. Go back to Security
5. Click "App passwords"
6. Select "Mail" and "Windows Computer"
7. Click "Generate"
8. Copy the 16-character password
9. Paste it in `.env` as `EMAIL_PASS`

---

## ▶️ Running the Application

### Start MongoDB (if not running)

Open a new terminal and run:
```bash
mongod
```

Keep this terminal open!

### Start the Server

In your VS Code terminal, run:

**Option 1: With Nodemon (auto-restart)**
```bash
npm run dev
```

**Option 2: Normal mode**
```bash
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
📍 Visit: http://localhost:5000
```

### Open in Browser

Open your browser and go to:
```
http://localhost:5000
```

You should see the landing page!

---

## 🧪 Testing the System

### 1. Register a Student

1. Click "Login" button
2. Click "Register"
3. Choose "Regular Student"
4. Fill in all 4 steps
5. Submit

### 2. Register a Teacher

1. Click "Register"
2. Choose "Staff: Teacher"
3. Fill in the form
4. For SAO Coordinator, select "Students Affairs Office (SAO)" as office
5. Submit

### 3. Login

Use the email and password you registered with.

---

## 📁 VS Code Extensions (Recommended)

Install these extensions in VS Code:

1. **Tailwind CSS IntelliSense** (already installed)
2. **MongoDB for VS Code** - View your database
3. **REST Client** or **Thunder Client** - Test API endpoints
4. **ESLint** - Code quality
5. **Prettier** - Code formatting

---

## 🔍 Using Postman (API Testing)

### Install Postman
Download from: https://www.postman.com/downloads/

### Test API Endpoints

**Example: Register Student**
1. Open Postman
2. Create new request
3. Method: POST
4. URL: `http://localhost:5000/api/auth/register/student`
5. Body → raw → JSON
6. Paste:
```json
{
  "email": "test@student.com",
  "password": "password123",
  "lrn": "2024120001",
  "fullName": "Dela Cruz, Juan Pablo",
  "gradeLevel": "Grade 12",
  "section": "St. Margaret",
  "gender": "Male",
  "parentFullName": "Dela Cruz, Maria",
  "parentEmail": "parent@email.com",
  "parentContactNumber": "09123456789",
  "parentRelationship": "Mother",
  "parentHomeAddress": "123 Main St, Cordova",
  "parentalConsent": true
}
```
7. Click "Send"

---

## 🌐 Publishing to the Internet

### Option 1: Vercel (Easiest)

1. Create account at: https://vercel.com
2. Install Vercel CLI:
```bash
npm install -g vercel
```
3. Login:
```bash
vercel login
```
4. Deploy:
```bash
vercel
```

**Note:** You'll need MongoDB Atlas (cloud database) for production.

### Option 2: Railway (Full Stack)

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Connect your repository
6. Add MongoDB service
7. Set environment variables
8. Deploy!

### Option 3: Netlify (Frontend) + Heroku (Backend)

**Frontend (Netlify):**
1. Go to: https://netlify.com
2. Drag and drop `public` folder
3. Done!

**Backend (Heroku):**
1. Go to: https://heroku.com
2. Create new app
3. Connect GitHub
4. Add MongoDB Atlas
5. Set environment variables
6. Deploy

---

## 🗄️ MongoDB Atlas (Cloud Database)

For production, use MongoDB Atlas:

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (free tier)
4. Create database user
5. Whitelist IP (0.0.0.0/0 for all)
6. Get connection string
7. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sao-system
```

---

## 🐛 Common Issues

### Issue: "Cannot find module"
**Solution:**
```bash
npm install
```

### Issue: "Port 5000 already in use"
**Solution:**
Change PORT in `.env` to 5001 or another number

### Issue: "MongoDB connection failed"
**Solution:**
- Make sure MongoDB is running: `mongod`
- Check if port 27017 is available

### Issue: "Emails not sending"
**Solution:**
- Verify Gmail App Password
- Check EMAIL_USER and EMAIL_PASS in .env
- Make sure 2FA is enabled on Gmail

### Issue: "Cannot connect to server"
**Solution:**
- Check if server is running
- Look for errors in terminal
- Make sure you're using correct URL

---

## 📊 Viewing Your Database

### Using MongoDB Compass (GUI)

1. Download: https://www.mongodb.com/try/download/compass
2. Install and open
3. Connect to: `mongodb://localhost:27017`
4. Browse your `sao-system` database

### Using VS Code Extension

1. Install "MongoDB for VS Code"
2. Click MongoDB icon in sidebar
3. Add connection: `mongodb://localhost:27017`
4. Browse collections

---

## 🔄 Git & GitHub Setup

### Initialize Git
```bash
git init
git add .
git commit -m "Initial commit"
```

### Create GitHub Repository
1. Go to: https://github.com
2. Click "New repository"
3. Name it: "sao-e-record-system"
4. Don't initialize with README
5. Copy the commands shown

### Push to GitHub
```bash
git remote add origin https://github.com/yourusername/sao-e-record-system.git
git branch -M main
git push -u origin main
```

---

## 📝 Daily Development Workflow

1. **Start MongoDB:**
```bash
mongod
```

2. **Start Server:**
```bash
npm run dev
```

3. **Make Changes:**
- Edit files in VS Code
- Server auto-restarts with nodemon

4. **Test:**
- Open browser: http://localhost:5000
- Test features

5. **Commit Changes:**
```bash
git add .
git commit -m "Description of changes"
git push
```

---

## 🎓 Learning Resources

### Node.js & Express
- https://nodejs.org/en/docs/
- https://expressjs.com/

### MongoDB
- https://docs.mongodb.com/
- https://mongoosejs.com/

### Tailwind CSS
- https://tailwindcss.com/docs

### JavaScript
- https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

## 💡 Tips

1. **Keep terminal open** - You'll see errors and logs
2. **Use console.log()** - Debug your code
3. **Check browser console** - Press F12 to see errors
4. **Save often** - Ctrl+S in VS Code
5. **Test frequently** - Don't write too much code before testing
6. **Read error messages** - They usually tell you what's wrong
7. **Use Git** - Commit often so you can undo mistakes

---

## 🆘 Getting Help

If you're stuck:

1. **Check the error message** - Read it carefully
2. **Check the terminal** - Look for server errors
3. **Check browser console** - Press F12
4. **Google the error** - Copy/paste error message
5. **Check README.md** - More detailed information
6. **Ask for help** - Contact: sao.digital.records@gmail.com

---

## ✅ Checklist

Before deploying to production:

- [ ] MongoDB is running
- [ ] All dependencies installed
- [ ] .env file configured
- [ ] Gmail app password set
- [ ] JWT_SECRET changed
- [ ] Server starts without errors
- [ ] Can register student
- [ ] Can register teacher
- [ ] Can login
- [ ] Emails are sending
- [ ] All pages load correctly
- [ ] Database is saving data
- [ ] Git repository created
- [ ] Code pushed to GitHub

---

**You're all set! Happy coding! 🎉**
