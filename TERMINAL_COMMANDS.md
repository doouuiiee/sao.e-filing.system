# 💻 Terminal Commands Reference
## Quick Command Guide for SAO E-Record System

---

## 🚀 Initial Setup Commands

### 1. Install Dependencies
```bash
npm install
```
This installs all packages listed in package.json.

### 2. Install Nodemon (Optional)
```bash
npm install -g nodemon
```
Automatically restarts server when files change.

---

## ▶️ Running the Application

### Start MongoDB
```bash
mongod
```
Keep this terminal window open while developing.

### Start Server (Development Mode)
```bash
npm run dev
```
Uses nodemon for auto-restart.

### Start Server (Production Mode)
```bash
npm start
```
Normal mode without auto-restart.

### Stop Server
Press `Ctrl + C` in the terminal.

---

## 📦 Package Management

### Install New Package
```bash
npm install package-name
```

### Install as Dev Dependency
```bash
npm install --save-dev package-name
```

### Uninstall Package
```bash
npm uninstall package-name
```

### Update All Packages
```bash
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

---

## 🗄️ MongoDB Commands

### Start MongoDB Service
```bash
mongod
```

### Connect to MongoDB Shell
```bash
mongosh
```

### Show All Databases
```javascript
show dbs
```

### Use Database
```javascript
use sao-system
```

### Show Collections
```javascript
show collections
```

### View All Users
```javascript
db.users.find()
```

### View All Students
```javascript
db.students.find()
```

### Clear Collection
```javascript
db.users.deleteMany({})
```

### Drop Database
```javascript
db.dropDatabase()
```

### Exit MongoDB Shell
```javascript
exit
```

---

## 🔧 Git Commands

### Initialize Git Repository
```bash
git init
```

### Check Status
```bash
git status
```

### Add All Files
```bash
git add .
```

### Add Specific File
```bash
git add filename.js
```

### Commit Changes
```bash
git commit -m "Your commit message"
```

### View Commit History
```bash
git log
```

### Create New Branch
```bash
git branch branch-name
```

### Switch Branch
```bash
git checkout branch-name
```

### Create and Switch Branch
```bash
git checkout -b branch-name
```

### Merge Branch
```bash
git merge branch-name
```

### Add Remote Repository
```bash
git remote add origin https://github.com/username/repo.git
```

### Push to GitHub
```bash
git push -u origin main
```

### Pull from GitHub
```bash
git pull origin main
```

### Clone Repository
```bash
git clone https://github.com/username/repo.git
```

### View Remote URLs
```bash
git remote -v
```

---

## 🌐 Deployment Commands

### Vercel Deployment

#### Install Vercel CLI
```bash
npm install -g vercel
```

#### Login to Vercel
```bash
vercel login
```

#### Deploy
```bash
vercel
```

#### Deploy to Production
```bash
vercel --prod
```

### Netlify Deployment

#### Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Login to Netlify
```bash
netlify login
```

#### Deploy
```bash
netlify deploy
```

#### Deploy to Production
```bash
netlify deploy --prod
```

---

## 🧪 Testing Commands

### Run Tests (if configured)
```bash
npm test
```

### Run Specific Test File
```bash
npm test filename.test.js
```

---

## 🔍 Debugging Commands

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Check MongoDB Version
```bash
mongod --version
```

### View Environment Variables
```bash
# Windows
echo %PATH%

# Linux/Mac
echo $PATH
```

### Find Process Using Port
```bash
# Windows
netstat -ano | findstr :5000

# Linux/Mac
lsof -i :5000
```

### Kill Process by Port
```bash
# Windows
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

---

## 📝 VS Code Terminal Shortcuts

### Open Terminal
```
Ctrl + ` (backtick)
```

### New Terminal
```
Ctrl + Shift + `
```

### Split Terminal
```
Ctrl + Shift + 5
```

### Close Terminal
```
Ctrl + D
```

### Clear Terminal
```
Ctrl + K
or
cls (Windows)
clear (Linux/Mac)
```

---

## 🔄 Common Workflows

### Daily Development Workflow
```bash
# 1. Start MongoDB
mongod

# 2. Open new terminal and start server
npm run dev

# 3. Make changes to code
# (Server auto-restarts with nodemon)

# 4. Commit changes
git add .
git commit -m "Description of changes"
git push
```

### Fresh Install Workflow
```bash
# 1. Clone repository
git clone https://github.com/username/repo.git

# 2. Navigate to folder
cd repo-name

# 3. Install dependencies
npm install

# 4. Configure .env file
# (Edit .env with your settings)

# 5. Start MongoDB
mongod

# 6. Start server
npm run dev
```

### Deployment Workflow
```bash
# 1. Test locally
npm start

# 2. Commit all changes
git add .
git commit -m "Ready for deployment"
git push

# 3. Deploy
vercel --prod
# or
netlify deploy --prod
```

---

## 🆘 Troubleshooting Commands

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall node_modules
```bash
# Delete node_modules folder first
rm -rf node_modules
# or manually delete the folder

# Then reinstall
npm install
```

### Fix npm Permissions (Linux/Mac)
```bash
sudo chown -R $USER /usr/local/lib/node_modules
```

### Update npm
```bash
npm install -g npm@latest
```

### Check for Errors
```bash
npm doctor
```

---

## 📊 Useful npm Scripts

Add these to package.json scripts section:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"No tests yet\"",
    "seed": "node utils/seed.js",
    "reset-db": "node utils/resetDatabase.js"
  }
}
```

Then run with:
```bash
npm run script-name
```

---

## 🔐 Environment Variables

### View Environment Variable (Windows)
```bash
echo %VARIABLE_NAME%
```

### View Environment Variable (Linux/Mac)
```bash
echo $VARIABLE_NAME
```

### Set Environment Variable (Windows)
```bash
set VARIABLE_NAME=value
```

### Set Environment Variable (Linux/Mac)
```bash
export VARIABLE_NAME=value
```

---

## 📦 Package.json Scripts Explained

### "start"
```bash
npm start
```
Runs: `node server.js`
Use for: Production

### "dev"
```bash
npm run dev
```
Runs: `nodemon server.js`
Use for: Development (auto-restart)

---

## 🎯 Quick Reference

### Most Used Commands
```bash
# Start development
npm run dev

# Install package
npm install package-name

# Commit changes
git add .
git commit -m "message"
git push

# Deploy
vercel --prod
```

### Emergency Commands
```bash
# Server won't start
npm install
npm cache clean --force

# Port already in use
# Change PORT in .env

# MongoDB won't connect
mongod

# Git conflicts
git status
git pull
# Resolve conflicts manually
git add .
git commit -m "Resolved conflicts"
git push
```

---

## 💡 Pro Tips

1. **Use Tab Completion**
   - Type first few letters and press Tab

2. **Use Arrow Keys**
   - Up/Down to cycle through previous commands

3. **Use Ctrl+C**
   - Stop any running process

4. **Use Ctrl+L or 'cls'**
   - Clear terminal screen

5. **Use '&&' to Chain Commands**
   ```bash
   npm install && npm start
   ```

6. **Use 'npm run' to See All Scripts**
   ```bash
   npm run
   ```

---

## 📚 Learn More

### Official Documentation
- Node.js: https://nodejs.org/docs
- npm: https://docs.npmjs.com
- MongoDB: https://docs.mongodb.com
- Git: https://git-scm.com/doc

### Cheat Sheets
- npm: https://devhints.io/npm
- Git: https://education.github.com/git-cheat-sheet-education.pdf
- MongoDB: https://www.mongodb.com/developer/products/mongodb/cheat-sheet/

---

**Keep this file handy for quick reference!** 📌
