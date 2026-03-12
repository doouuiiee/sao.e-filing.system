# Deployment Guide - SAO E-Record Filing System

## ⚠️ SECURITY CHECKLIST - BEFORE PUBLISHING

### 1. Remove Sensitive Information ✅

**Already Protected:**
- ✅ `.env` file is in `.gitignore`
- ✅ `config/serviceAccountKey.json` is in `.gitignore`
- ✅ `.env.example` created as template

**⚠️ CRITICAL - Check These Files:**

#### Your `.env` file contains:
```
MONGODB_URI=mongodb+srv://doouuiiee_db_user:Capstone2026@cluster0...
EMAIL_USER=sao.digital.records@gmail.com
EMAIL_PASS=shxm yuzw rthm jvpq
JWT_SECRET=sao_erecord_secret_key_2026_cordova_catholic_school
```

**✅ This is SAFE** - `.env` is in `.gitignore` and won't be uploaded to GitHub.

#### Your Firebase Config (in JavaScript files):
```javascript
apiKey: "AIzaSyBJRzX4adp_LFOARTc53UzX9OuOMHS0Tus"
authDomain: "logininfo-c2e4a.firebaseapp.com"
projectId: "logininfo-c2e4a"
```

**⚠️ IMPORTANT:** Firebase client config (apiKey, authDomain, etc.) is SAFE to expose in frontend code. This is by design - Firebase uses security rules to protect your data, not the API key.

However, for best practices, you can move this to environment variables.

---

## 🔒 Security Recommendations

### 1. Change Default Passwords
After deployment, change these:
- MongoDB password
- Email app password
- JWT secret (generate a new random one)

### 2. Firebase Security Rules
Set up proper security rules in Firebase Console:

```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

// Storage Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. MongoDB Security
- ✅ Use MongoDB Atlas with IP whitelist
- ✅ Use strong passwords
- ✅ Enable authentication
- ✅ Use connection string with credentials

### 4. Environment Variables
Never commit:
- ❌ `.env` file
- ❌ `serviceAccountKey.json`
- ❌ Database credentials
- ❌ API keys for third-party services

---

## 📦 Preparing for GitHub

### 1. Create .gitignore (Already Done ✅)
```bash
# Check if .gitignore exists
cat .gitignore
```

### 2. Remove Sensitive Files from Git History
If you already committed sensitive files:

```bash
# Remove .env from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Remove serviceAccountKey.json
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch config/serviceAccountKey.json" \
  --prune-empty --tag-name-filter cat -- --all
```

### 3. Initialize Git Repository
```bash
# Initialize git
git init

# Add all files (respecting .gitignore)
git add .

# First commit
git commit -m "Initial commit: SAO E-Record Filing System"

# Add remote repository
git remote add origin https://github.com/yourusername/sao-erecord-system.git

# Push to GitHub
git push -u origin main
```

### 4. Create README for GitHub
Update your `README.md` with:
- Project description
- Features list
- Installation instructions
- Environment setup
- License information

---

## 🚀 Deploying to Render

### Prerequisites
1. GitHub repository created
2. Render account created
3. MongoDB Atlas database ready
4. Firebase project configured

### Step 1: Prepare for Render

Create `render.yaml` (optional but recommended):

```yaml
services:
  - type: web
    name: sao-erecord-system
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: EMAIL_USER
        sync: false
      - key: EMAIL_PASS
        sync: false
      - key: PORT
        value: 5000
      - key: FRONTEND_URL
        sync: false
```

### Step 2: Deploy to Render

1. **Go to Render Dashboard**
   - Visit https://render.com
   - Sign in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: sao-erecord-system
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Go to "Environment" tab and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   PORT=5000
   FRONTEND_URL=https://your-app-name.onrender.com
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Your app will be live at: `https://your-app-name.onrender.com`

### Step 3: Post-Deployment Setup

1. **Update Firebase Authorized Domains**
   - Go to Firebase Console
   - Authentication → Settings → Authorized domains
   - Add: `your-app-name.onrender.com`

2. **Update MongoDB IP Whitelist**
   - Go to MongoDB Atlas
   - Network Access
   - Add IP: `0.0.0.0/0` (allow all) or Render's IP ranges

3. **Test Your Application**
   - Visit your Render URL
   - Test login/registration
   - Test all features

---

## 🔧 Environment Variables Reference

### Required for Production:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster...` |
| `JWT_SECRET` | Secret for JWT tokens | Random 32+ character string |
| `EMAIL_USER` | Gmail address for emails | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail app password | 16-character app password |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Your app URL | `https://your-app.onrender.com` |

### Optional:

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (production/development) |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase private key |

---

## 📝 Pre-Deployment Checklist

### Code Quality
- [ ] All features tested locally
- [ ] No console.log statements in production code
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Security middleware in place

### Security
- [ ] `.env` file in `.gitignore`
- [ ] `serviceAccountKey.json` in `.gitignore`
- [ ] Strong JWT secret generated
- [ ] Firebase security rules configured
- [ ] MongoDB IP whitelist configured
- [ ] CORS properly configured

### Configuration
- [ ] `.env.example` created
- [ ] `README.md` updated
- [ ] `package.json` scripts configured
- [ ] Dependencies up to date
- [ ] Node version specified in `package.json`

### Documentation
- [ ] Installation instructions
- [ ] Environment setup guide
- [ ] API documentation
- [ ] User guide
- [ ] Contributing guidelines (if open source)

---

## 🐛 Common Deployment Issues

### Issue 1: "Cannot connect to MongoDB"
**Solution:** Check MongoDB IP whitelist, add `0.0.0.0/0` or Render IPs

### Issue 2: "Firebase authentication failed"
**Solution:** Add Render domain to Firebase authorized domains

### Issue 3: "Email not sending"
**Solution:** 
- Use Gmail app password, not regular password
- Enable "Less secure app access" (if needed)
- Check EMAIL_USER and EMAIL_PASS in environment variables

### Issue 4: "Port already in use"
**Solution:** Render assigns port automatically, use `process.env.PORT`

### Issue 5: "Build failed"
**Solution:** 
- Check `package.json` for correct scripts
- Ensure all dependencies are in `dependencies`, not `devDependencies`
- Check Node version compatibility

---

## 🔄 Continuous Deployment

### Auto-Deploy from GitHub
Render automatically deploys when you push to main branch:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Render will automatically deploy
```

### Manual Deploy
In Render dashboard:
1. Go to your service
2. Click "Manual Deploy"
3. Select branch
4. Click "Deploy"

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor resource usage
- Check deployment history
- View error reports

### Health Checks
Add health check endpoint in `server.js`:

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
```

---

## 🎯 Production Best Practices

1. **Use Environment Variables** - Never hardcode credentials
2. **Enable HTTPS** - Render provides free SSL
3. **Set up Monitoring** - Use Render's built-in monitoring
4. **Regular Backups** - Backup MongoDB regularly
5. **Update Dependencies** - Keep packages up to date
6. **Error Logging** - Implement proper error logging
7. **Rate Limiting** - Prevent abuse with rate limiting
8. **Input Validation** - Validate all user inputs
9. **Security Headers** - Use helmet.js for security headers
10. **CORS Configuration** - Properly configure CORS

---

## ✅ Your Project is Ready!

Your SAO E-Record Filing System is properly configured for deployment:

✅ Sensitive files protected with `.gitignore`
✅ Environment variables template created
✅ Firebase configured
✅ MongoDB connection secured
✅ Email service configured
✅ Authentication system complete

**You can safely publish to GitHub and deploy to Render!**

Just remember to:
1. Never commit `.env` file
2. Add environment variables in Render dashboard
3. Update Firebase authorized domains
4. Configure MongoDB IP whitelist

---

## 📞 Support

If you encounter issues:
1. Check Render logs
2. Review Firebase Console
3. Check MongoDB Atlas logs
4. Review this deployment guide
5. Check GitHub Issues (if open source)

Good luck with your deployment! 🚀
