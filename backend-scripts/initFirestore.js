const admin = require('firebase-admin');
    const serviceAccount = require('./serviceAccountKey.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://backend-for-proj.firebaseio.com` // Replace with your project ID
    });

    const db = admin.firestore();

    // Now you can use the 'db' object to interact with Firestore
