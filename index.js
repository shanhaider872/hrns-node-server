const express = require("express");
const api = express();
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./hrns-6ae75-firebase-adminsdk-t1mnb-1075da2c07.json");
var serviceAccount2 = require("./hrns-verifications-firebase-adminsdk-qb7t1-54889d8dbf.json");


// const firstApp = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const firstApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
},'first');

const db = firstApp.firestore();

const seconndApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount2)
}, 'second');

api.use(bodyParser.json());
const db2 = seconndApp.firestore();

api.post("/team", async (req, res) => {
  try {

    const data = req.body;
    const id = (Date.now() * 1000).toString();
    const docRef = db2.collection('addpost_verification_data').doc(id);
    await docRef.set(data);
    //************************ */

  // Write the data to the target database here
    res.send('Data transfer complete');

    // const liam2 = await db.collection('addpost_data').doc('1680059879895059').get();

    // if (!liam2.exists) {
    //   console.log('No document');
    //  } else {
    //   console.log(liam2.data());
    //   res.send({ team: liam2.data() });
    //  }

    // const usersDb = db2.collection('addpost_verification_data');
    // const liam = usersDb.doc('1680059879895059');
    // await liam.set(liam2.data());

    // console.log(users, 'users')

  } catch (error) {
    console.log(error, "error");
    res.status(500).send(error);
  }
});

var port = process.env.PORT || 3000;
api.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port 3000");
});
