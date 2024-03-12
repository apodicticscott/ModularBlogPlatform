// pages/api/setAdminRole.js
import admin from '../../utils/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  try {
    // Assuming you send the user ID and a secret key to authorize this request
    const { uid, secretKey } = req.body;
    if (secretKey !== process.env.SECRET_KEY_FOR_ADMIN) {
      throw new Error('Unauthorized');
    }

    // Set custom user claims
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.status(200).json({ message: `Success! ${uid} has been made an admin.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
