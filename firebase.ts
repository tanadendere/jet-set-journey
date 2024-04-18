const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccount');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
async function addUser() {
  const docRef = db.collection('users').doc('wakgO3NV4ce91EgbaFEsHWx7pLr1');

  await docRef.set({
    email: 'tana22@gmail.com',
    name: 'Tanatswa',
    password: 'tanatswa123',
    surname: 'Dendere',
    userId: 'wakgO3NV4ce91EgbaFEsHWx7pLr1',
  });
}

addUser();
