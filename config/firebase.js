// ============================================
// FIREBASE CONFIGURATION
// ============================================

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// You'll need to download your service account key from Firebase Console
// and place it in config/serviceAccountKey.json

try {
  const serviceAccount = require('./serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.log('⚠️  Firebase service account key not found. Please add serviceAccountKey.json');
  console.log('   Download from: Firebase Console > Project Settings > Service Accounts');
}

const auth = admin.auth();

module.exports = { admin, auth };
