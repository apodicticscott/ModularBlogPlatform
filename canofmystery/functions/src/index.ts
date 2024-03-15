import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
    await db.doc(`users/${user.uid}`).create({
        userInfo: JSON.parse(JSON.stringify(user)),
        studentWriter: false,
        adminPerm: false,
        hasPublished: false,
    })

})