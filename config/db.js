const admin = require("firebase-admin");
const serviceAccount = require("../firestore/service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodewithfirebase-e885a-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

module.exports = db;